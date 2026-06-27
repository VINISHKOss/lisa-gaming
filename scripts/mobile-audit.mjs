import { chromium, webkit } from 'playwright'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const URL = process.env.URL || 'http://127.0.0.1:5173'
const OUT_DIR = join(process.cwd(), 'scripts', 'mobile-audit-results')

const VIEWPORTS = [
  { width: 320, height: 568, label: '320-narrow' },
  { width: 393, height: 852, label: 'iphone-17' },
]

const NAV = {
  home: null,
  catalog: 'Каталог',
  cart: 'Корзина',
  about: 'О Нас',
  contacts: 'Контакты',
  login: 'Войти',
}

function headerNav(page, label) {
  return page.locator('header nav').getByRole('button', { name: label, exact: true })
}

async function audit(page) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth
    const issues = []

    const docOverflow = document.documentElement.scrollWidth > docWidth + 1
    const bodyOverflow = document.body.scrollWidth > docWidth + 1
    const main = document.querySelector('main')
    const mainOverflow = main && main.scrollWidth > main.clientWidth + 1

    if (docOverflow) {
      issues.push({
        severity: 'error',
        type: 'horizontal-scroll',
        message: `Документ шире экрана: scrollWidth ${document.documentElement.scrollWidth}px > viewport ${docWidth}px`,
      })
    }
    if (mainOverflow) {
      issues.push({
        severity: 'error',
        type: 'main-horizontal-scroll',
        message: `main шире контейнера: ${main.scrollWidth}px > ${main.clientWidth}px`,
      })
    }

    const scrollers = []
    const walkScroll = (el) => {
      if (el.scrollWidth > el.clientWidth + 2 && el.clientHeight > 0) {
        const style = getComputedStyle(el)
        if (style.visibility !== 'hidden' && style.display !== 'none') {
          scrollers.push({
            tag: el.tagName.toLowerCase(),
            className: (el.className?.toString?.() || '').slice(0, 80),
            delta: el.scrollWidth - el.clientWidth,
            overflowX: style.overflowX,
          })
        }
      }
      for (const child of el.children) walkScroll(child)
    }
    walkScroll(document.documentElement)

    for (const s of scrollers) {
      if (s.overflowX === 'visible' && s.delta > 4) {
        issues.push({
          severity: 'warn',
          type: 'child-overflow',
          message: `${s.tag} (+${s.delta}px, overflow: visible): ${s.className}`,
        })
      }
    }

    const offenders = []
    const walkBounds = (el) => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0 && (rect.right > docWidth + 2 || rect.left < -2)) {
        const style = getComputedStyle(el)
        if (style.visibility !== 'hidden' && style.display !== 'none' && style.opacity !== '0') {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            className: (el.className?.toString?.() || '').slice(0, 60),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            overflowX: style.overflowX,
          })
        }
      }
      for (const child of el.children) walkBounds(child)
    }
    walkBounds(document.body)

    for (const o of offenders.slice(0, 5)) {
      if (o.overflowX !== 'hidden' && o.overflowX !== 'clip') {
        issues.push({
          severity: 'warn',
          type: 'visual-overflow',
          message: `${o.tag} выходит за экран (L:${o.left} R:${o.right}): ${o.className}`,
        })
      }
    }

    const interactive = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"]',
    )
    for (const el of interactive) {
      const rect = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      if (style.visibility === 'hidden' || style.display === 'none' || rect.width === 0) continue
      if (rect.width < 44 || rect.height < 44) {
        const label =
          el.getAttribute('aria-label') ||
          el.textContent?.trim().slice(0, 30) ||
          el.tagName.toLowerCase()
        issues.push({
          severity: 'warn',
          type: 'small-tap-target',
          message: `Маленькая зона нажатия (${Math.round(rect.width)}×${Math.round(rect.height)}): ${label}`,
        })
      }
    }

    const smallText = []
    const walkText = (el) => {
      if (el.children.length === 0 && el.textContent?.trim()) {
        const size = parseFloat(getComputedStyle(el).fontSize)
        if (size < 12) {
          smallText.push(el.textContent.trim().slice(0, 40))
        }
      }
      for (const child of el.children) walkText(child)
    }
    walkText(document.body)
    if (smallText.length > 8) {
      issues.push({
        severity: 'info',
        type: 'small-text',
        message: `Много текста < 12px (${smallText.length} элементов)`,
      })
    }

    const h1 = document.querySelector('h1')
    const title = document.querySelector('title')?.textContent || ''
    const hasSearch = !!document.querySelector('input[type="search"]')

    return {
      docWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      docOverflow,
      bodyOverflow,
      mainOverflow,
      issueCount: issues.length,
      issues,
      meta: { title, hasH1: !!h1, hasSearch },
    }
  })
}

async function gotoPage(page, pageName) {
  if (pageName === 'home') {
    await page.goto(URL, { waitUntil: 'networkidle' })
    return
  }
  const label = NAV[pageName]
  if (!label) throw new Error(`Unknown page: ${pageName}`)
  await headerNav(page, label).click()
  await page.waitForTimeout(600)
}

async function runBrowser(browserName, launch, device) {
  const browser = await launch()
  const context = await browser.newContext({
    ...device,
    locale: 'ru-RU',
  })
  const page = await context.newPage()
  const report = { browser: browserName, pages: [], summary: { errors: 0, warnings: 0, info: 0 } }

  const pageFlows = [
    'home',
    'catalog',
    'cart',
    'about',
    'contacts',
    'login',
  ]

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height })

    for (const pageName of pageFlows) {
      await gotoPage(page, pageName)
      await page.waitForTimeout(400)

      const result = await audit(page)
      const screenshotName = `${browserName}-${vp.label}-${pageName}.png`
      await page.screenshot({ path: join(OUT_DIR, screenshotName), fullPage: false })

      for (const issue of result.issues) {
        if (issue.severity === 'error') report.summary.errors++
        else if (issue.severity === 'warn') report.summary.warnings++
        else report.summary.info++
      }

      report.pages.push({
        viewport: vp.label,
        page: pageName,
        ...result,
        screenshot: screenshotName,
      })
    }

    await page.setViewportSize({ width: vp.width, height: vp.height })
    await gotoPage(page, 'catalog')
    const productCard = page.locator('article').first()
    if (await productCard.count()) {
      await productCard.click()
      await page.waitForTimeout(500)
      const result = await audit(page)
      const screenshotName = `${browserName}-${vp.label}-product-detail.png`
      await page.screenshot({ path: join(OUT_DIR, screenshotName), fullPage: false })
      for (const issue of result.issues) {
        if (issue.severity === 'error') report.summary.errors++
        else if (issue.severity === 'warn') report.summary.warnings++
        else report.summary.info++
      }
      report.pages.push({
        viewport: vp.label,
        page: 'product-detail',
        ...result,
        screenshot: screenshotName,
      })
    }

    await page.setViewportSize({ width: vp.width, height: vp.height })
    await gotoPage(page, 'home')
    const search = page.locator('input[type="search"]')
    await search.fill('asus')
    await search.press('Enter')
    await page.waitForTimeout(500)
    const result = await audit(page)
    const screenshotName = `${browserName}-${vp.label}-search.png`
    await page.screenshot({ path: join(OUT_DIR, screenshotName), fullPage: false })
    for (const issue of result.issues) {
      if (issue.severity === 'error') report.summary.errors++
      else if (issue.severity === 'warn') report.summary.warnings++
      else report.summary.info++
    }
    report.pages.push({
      viewport: vp.label,
      page: 'search',
      ...result,
      screenshot: screenshotName,
    })

    await gotoPage(page, 'catalog')
    await page.locator('main').getByRole('button', { name: 'Сборки ПК', exact: true }).click()
    await page.waitForTimeout(500)
    const pcResult = await audit(page)
    const pcShot = `${browserName}-${vp.label}-catalog-pc.png`
    await page.screenshot({ path: join(OUT_DIR, pcShot), fullPage: false })
    for (const issue of pcResult.issues) {
      if (issue.severity === 'error') report.summary.errors++
      else if (issue.severity === 'warn') report.summary.warnings++
      else report.summary.info++
    }
    report.pages.push({
      viewport: vp.label,
      page: 'catalog-pc-builds',
      ...pcResult,
      screenshot: pcShot,
    })

    await gotoPage(page, 'login')
    await page.locator('main').getByRole('button', { name: 'Зарегистрироваться' }).click()
    await page.waitForTimeout(400)
    const regResult = await audit(page)
    const regShot = `${browserName}-${vp.label}-register.png`
    await page.screenshot({ path: join(OUT_DIR, regShot), fullPage: false })
    for (const issue of regResult.issues) {
      if (issue.severity === 'error') report.summary.errors++
      else if (issue.severity === 'warn') report.summary.warnings++
      else report.summary.info++
    }
    report.pages.push({
      viewport: vp.label,
      page: 'register',
      ...regResult,
      screenshot: regShot,
    })
  }

  await browser.close()
  return report
}

mkdirSync(OUT_DIR, { recursive: true })

const iphoneDevice = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
}

const reports = []
reports.push(await runBrowser('webkit-safari', () => webkit.launch(), iphoneDevice))
reports.push(
  await runBrowser('chromium-mobile', () => chromium.launch(), {
    ...iphoneDevice,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  }),
)

writeFileSync(join(OUT_DIR, 'report.json'), JSON.stringify(reports, null, 2))

console.log('\n========== MOBILE AUDIT REPORT ==========\n')
for (const r of reports) {
  console.log(`Browser: ${r.browser}`)
  console.log(`  Errors: ${r.summary.errors}, Warnings: ${r.summary.warnings}, Info: ${r.summary.info}`)
  const errors = r.pages.filter((p) => p.issues.some((i) => i.severity === 'error'))
  if (errors.length) {
    console.log('  PAGES WITH ERRORS:')
    for (const p of errors) {
      console.log(`    [${p.viewport}] ${p.page}`)
      for (const i of p.issues.filter((x) => x.severity === 'error')) {
        console.log(`      ✗ ${i.message}`)
      }
    }
  } else {
    console.log('  ✓ No horizontal scroll errors detected')
  }
}

const exitCode = reports.some((r) => r.summary.errors > 0) ? 1 : 0
process.exit(exitCode)
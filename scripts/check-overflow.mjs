import { chromium, webkit } from 'playwright'

const URL = process.env.URL || 'http://127.0.0.1:5173'
const VIEWPORTS = [
  { width: 320, height: 568, name: '320px' },
  { width: 390, height: 844, name: '390px' },
]

async function auditPage(page, label) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth

    const scrollers = []
    const walk = (el) => {
      if (el.scrollWidth > el.clientWidth + 1) {
        const rect = el.getBoundingClientRect()
        scrollers.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: (el.className?.toString?.() || '').slice(0, 100),
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          overflowX: getComputedStyle(el).overflowX,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        })
      }
      for (const child of el.children) walk(child)
    }
    walk(document.documentElement)

    const offenders = []
    const walk2 = (el) => {
      const rect = el.getBoundingClientRect()
      if (rect.right > docWidth + 2 || rect.left < -2) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          className: (el.className?.toString?.() || '').slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        })
      }
      for (const child of el.children) walk2(child)
    }
    walk2(document.body)

    scrollers.sort((a, b) => b.scrollWidth - b.clientWidth - (a.scrollWidth - a.clientWidth))
    offenders.sort((a, b) => b.right - a.right)

    return {
      docWidth,
      htmlScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      mainScrollWidth: document.querySelector('main')?.scrollWidth,
      mainClientWidth: document.querySelector('main')?.clientWidth,
      scrollers: scrollers.slice(0, 10),
      offenders: offenders.slice(0, 10),
    }
  }).then((r) => {
    const docOverflow = r.htmlScrollWidth > r.docWidth + 1
    const mainOverflow =
      r.mainScrollWidth && r.mainClientWidth && r.mainScrollWidth > r.mainClientWidth + 1
    console.log(`\n=== ${label} ===`)
    console.log(
      `doc ${r.docWidth}/${r.htmlScrollWidth} | main ${r.mainClientWidth}/${r.mainScrollWidth} | docOverflow:${docOverflow} mainOverflow:${mainOverflow}`,
    )
    if (r.scrollers.length) {
      console.log('Horizontal scrollers:')
      for (const s of r.scrollers) {
        console.log(
          `  ${s.tag}#${s.id} +${s.scrollWidth - s.clientWidth}px overflow-x:${s.overflowX} | ${s.className.slice(0, 50)}`,
        )
      }
    }
    if (r.offenders.length) {
      console.log('Visual overflow elements:')
      for (const o of r.offenders) {
        console.log(`  ${o.tag} L:${o.left} R:${o.right} | ${o.className}`)
      }
    }
    return docOverflow || mainOverflow || r.scrollers.length > 0
  })
}

async function run(browserName, launch) {
  console.log(`\n######## ${browserName} ########`)
  const browser = await launch()
  const context = await browser.newContext({ isMobile: true, hasTouch: true })
  const page = await context.newPage()

  let any = false
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    any = (await auditPage(page, `home ${vp.name}`)) || any

    // catalog
    await page.getByRole('button', { name: 'Каталог' }).click()
    await page.waitForTimeout(500)
    any = (await auditPage(page, `catalog ${vp.name}`)) || any

    // about
    await page.getByRole('button', { name: 'О Нас' }).click()
    await page.waitForTimeout(500)
    any = (await auditPage(page, `about ${vp.name}`)) || any

    // contacts
    await page.getByRole('button', { name: 'Контакты' }).click()
    await page.waitForTimeout(500)
    any = (await auditPage(page, `contacts ${vp.name}`)) || any
  }

  await browser.close()
  return any
}

const chromiumOverflow = await run('Chromium', () => chromium.launch())
let webkitOverflow = false
try {
  webkitOverflow = await run('WebKit', () => webkit.launch())
} catch (e) {
  console.log('WebKit unavailable:', e.message)
}

process.exit(chromiumOverflow || webkitOverflow ? 1 : 0)
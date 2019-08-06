const common = require('../utils/common');

/**
 * Template of statement.
 */
var templateScroll = `
await page.evaluate(async () => {
  await new Promise((resolve, reject) => {
    let totalHeight = 0;
    let distance = {};
    let scrollHeight = {};
    let timer = setInterval(() => {
      window.scrollBy({}, distance);
      totalHeight += distance;
      if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, distance);
  });
});
await page.waitFor(1000);
`;

var templateClickTargetBlank = `
element = await page.$x('{}');
await element[0].click();
await page.waitFor(3000);
pages = await browser.pages();
page = pages[pages.length - 1];
await page.bringToFront();
await page.setViewport({
  width: 2540,
  height: 1318
});
await page.waitFor(500);
`;

var templateClickTargetSelf = `
element = await page.$x('{}');
await element[0].click();
await page.waitFor(3000);
pages = await browser.pages();
page = pages[pages.length - 1];
await page.bringToFront();
await page.waitFor(500);
`;

var templateNewTab = `
page = await browser.newPage();
await page.setViewport({
  width: 2540,
  height: 1318
});
await page.waitFor(500);
`;

var templateURLChange = `
await page.goto('{}', {
  waitUntil: 'networkidle0',
});
await page.waitFor(500);
`;

var templateCloseTab = `
await page.close();
pages = await browser.pages();
page = pages[pages.length - 1];
await page.bringToFront();
await page.waitFor(500);
`;

/**
 * 
 */
class Statement {
  constructor(eventType) {
    this.eventType = eventType;
    common.extendsStringPrototype();
  }
}

/**
 * 
 */
class ClickTargetBlank extends Statement {
  constructor(eventType) {
    super(eventType);
  }

  getStatement(xpath, info) {
    const scrollY = info.scrollY;
    const scrollX = 0;
    const step = 100;
    let statement = undefined;

    if (info.scrollY > 1000) {
      statement = templateScroll.format(step, scrollY, scrollX) + templateClickTargetBlank.format(xpath);
    } else {
      statement = templateClickTargetBlank.format(xpath);
    }
    return statement;
  }
}

/**
 * 
 */
class ClickTargetSelf extends Statement {
  constructor(eventType) {
    super(eventType);
  }

  getStatement(xpath, info) {
    const scrollY = info.scrollY;
    const scrollX = 0;
    const step = 100;
    let statement = undefined;

    if (info.scrollY > 1000) {
      statement = templateScroll.format(step, scrollY, scrollX) + templateClickTargetSelf.format(xpath);
    } else {
      statement = templateClickTargetSelf.format(xpath);
    }
    return statement;
  }
}

/**
 * 
 */
class NewTab extends Statement {
  constructor(eventType) {
    super(eventType);
  }

  getStatement() {
    return templateNewTab;
  }
}

/**
 * 
 */
class URLChange extends Statement {
  constructor(eventType) {
    super(eventType);
  }

  getStatement(url) {
    return templateURLChange.format(url);
  }
}

/**
 * 
 */
class CloseTab extends Statement {
  constructor(eventType) {
    super(eventType);
  }

  getStatement() {
    return templateCloseTab;
  }
}

module.exports = {
  ClickTargetBlank,
  ClickTargetSelf,
  NewTab,
  URLChange,
  CloseTab,
}
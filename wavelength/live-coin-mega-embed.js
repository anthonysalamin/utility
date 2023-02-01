/*
  * CRYPTO | LiveCoinWatch V.2
  * build: 03.12.21 @ 13:25
*/

// -----------------------------------------------------------------------------
// Live web widgets to be embedded on other sites.
// AJAX updates every 15 seconds.
//
// TODO:  Dynamic uris
//        Ellipsize longer names
//        Better style handling
//        Configurable timeout
//        Replace elements on update instead of overwritting (?)
//
// Uncomment mpa lines for multi-page (conventional) websites
// Uncomment spa lines for single-page applications
//
// Author: Danny Buonocore - Live Coin Watch, LLC
// -----------------------------------------------------------------------------

(function() { // mpa

    let wpi1, whi1;
    let wpi3;
    let wpi5;
    let wpi6;
    
    // function load() { // spa
    
      if (typeof window === 'undefined')
        return;
    
      if (wpi1) clearInterval(wpi1);
      if (whi1) clearInterval(whi1);
      if (wpi3) clearInterval(wpi3);
      if (wpi5) clearInterval(wpi5);
      if (wpi6) clearInterval(wpi6);
    
      // ---------------------------------------------------------------------------
      // Common
      // ---------------------------------------------------------------------------
      let TIMEOUT = 15 * 1000;
      let HIST_TIMEOUT = TIMEOUT;//5 * 60 * 1000;
      let DAY = 86400000;
      let PERIODS = {
        d: { l: 'Today',        t: DAY },
        h: { l: 'This Hour',    t: DAY / 24 },
        w: { l: 'This Week',    t: DAY * 7 },
        m: { l: 'This Month',   t: DAY * 30 },
        q: { l: 'This Quarter', t: DAY * 90 },
        y: { l: 'This Year',    t: DAY * 365 }
      };
    
      let dNoneStyle      = 'display: none';
      let dTableStyle     = 'display: inline-table';
      let mAutoStyle      = 'margin: auto';
      let pAbsoluteStyle  = 'position: absolute';
      let pRelativeStyle  = 'position: relative';
      let textLeftStyle   = 'text-align: left';
      let textRightStyle  = 'text-align: right';
      let textCenterStyle = 'text-align: center';
    
      let redLight    = '#fb0000';
      let redDark     = '#ff5a1c'; // 🍋 orange legend
      let greenLight  = '#00b600';
      let greenDark   = '#01D396'; // 🍋 highlight green legend
    
      let widgetStyle = s([
        'width: 380px',
        'height: 200px',
        'border-radius: 5px',
        'border-style: solid',
        'text-align: left',
        'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif',
        'margin: 5px',
        'overflow: hidden',
        'box-sizing : content-box'
      ]);
    
      let widgetTallStyle = s([
        widgetStyle,
        'height: 620px'
      ]);
    
      let widgetMiniStyle = s([
        widgetStyle,
        'width: 280px',
        'height: 60px'
      ]);
    
      let widgetBannerStyle = s([
        widgetStyle,
        'width: 100%',
        'max-width: 1680px',
        'height: 72px',
        'overflow: hidden',
        'background-color: transparent', // 🍋 color
        'border-width: 0',
        '-webkit-mask-image:linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%,rgba(0,0,0,1) 90%,rgba(0,0,0,0))'
      ]);
    
      let widgetDarkStyle = s([
        'background-color: #1f2434',
        'border-color: transparent'
      ]);
    
      let blockStyle = s([
        'height: 48px',
        'margin-left: 10px',
        'float: left'
      ]);
    
      let titleStyle = s([
        blockStyle,
        'margin-top: 3px'
      ]);
    
      let imgStyle = s([
        titleStyle,
        'height: 37px'
      ]);
    
      let smImgStyle = s([
        imgStyle,
        'height: 28px',
        'padding-top: 1px',
        'padding-left: 5px'
      ]);
    
      let priceStyle = s([
        titleStyle,
        'float: right',
        'margin-right: 10px',
        'margin-left: 0'
      ]);
    
      let rowStyle = s([
        'width: 100%',
        'height: 52px'
      ]);
    
      let lgRowStyle = s([rowStyle, 'height: 64px']);
      let smRowStyle = s([rowStyle, 'height: 42px']);
      let vsRowStyle = s([rowStyle, 'height: 32px', 'position: relative']);
    
      let borderlessRowStyle = s([
        rowStyle,
        'height: 51px',
        'line-height: 38px'
      ]);
    
      let borderRowStyle = s([
        rowStyle,
        'height: 51px',
        'line-height: 38px',
        'border-style: solid',
        'border-width: 1px',
        'border-bottom: 0',
        'border-left: 0',
        'border-right: 0',
      ]);
    
      let borderRowDark1Style = s([
        rowStyle,
        'line-height: 38px'
      ]);
    
      let borderRowDark2Style = s([
        rowStyle,
        'line-height: 38px',
        'background-color: #1b2030'
      ]);
    
      let topStyle = s([
        rowStyle,
        'margin-top: 10px',
      ]);
    
      let lgTopStyle = s([
        topStyle,
        'height: 40px',
        'padding-top: 10px'
      ]);
    
      let lgTopFullStyle = s([
        topStyle,
        'height: 66px',
        'padding-top: 25px'
      ]);
    
      let textStyle = s([
        'margin-top: 0',
        'margin-bottom: 0',
        'color: #020202',
        'text-shadow: none',
        'line-height: 1em'
      ]);
    
      let subtextStyle = s([
        'color: #777',
      ]);
    
      let textDarkStyle = s([
        'color: white'
      ]);
    
      let subtextDarkStyle = s([
        'color: #606f89'
      ]);
    
      let smTextStyle = s([
        textStyle,
        'font-size: 13px',
        'line-height: 1em'
      ]);
    
      let lgTextStyle = s([
        textStyle,
        'font-size: 18px',
        'line-height: 1em'
      ]);
    
      let ellipsisStyle = s([
        'text-overflow: ellipsis',
        'white-space: nowrap',
        'overflow: hidden'
      ]);
    
      let divHeaderStyle = s([
        'width: 100%',
        'text-align: center',
        'border-top: 1px solid #000',
        'line-height: 0.1em',
        'border-color: #d4d4d5'
      ]);
    
      let footerStyle = s([
        'width: 100%',
        'text-align: center',
        'pointer-events: none'
      ]);
    
      let leftStyle = s([
        'display: inline-block',
        'width: 50%',
        'text-align: left',
      ]);
    
      let rightStyle = s([
        'display: inline-block',
        'width: 50%',
        'text-align: right',
        'pointer-events: none'
      ]);
    
      let anchorStyle = s([
        'position: relative',
        'left: 5px',
        'top: -5px'
      ]);
    
      let chartLabelStyle = s([
        'position: relative',
        'right: 5px',
        'top: -5px'
      ]);
    
      let linkStyle = s([
        // 'color: #4183c4',
        'font-size: 12px',
        'pointer-events: auto',
        'cursor: pointer'
      ]);
    
      let linkDarkStyle = s([
        linkStyle,
        // 'color: #58c7c5'
      ]);
    
      let chartStyle = s([
        'width: 380px',
        'height: 110px'
      ]);
    
      let marqueeStyle = s([
        'display: inline',
        'position: relative',
        'height: 64px',
        'padding: 3px',
        'white-space: nowrap',
        'overflow: hidden',
        'will-change: transform'
      ]);
    
      let subMarqueeStyle = s([
        marqueeStyle,
        'height: 24px',
      ]);
    
      let cellStyle = s([
        'height: 24px',
        'line-height: 24px'
      ]);
    
      let smCellStyle = s([
        'height: 16px',
        'line-height: 16px'
      ]);
    
      let marqueeCellStyle = s([
        cellStyle,
        'display: inline-block',
        'width: 180px',
        'height: 100%'
      ]);
    
      let currencySymbols = {
        BTC: '₿',
        ETH: 'Ξ',
        BGN: 'лв',
        NOK: 'kr',
        RUB: '₽',
        AUD: '$',
        BND: '$',
        ARS: '$',
        KHR: '៛',
        BOB: '$b',
        BBD: '$',
        SAR: '﷼',
        KGS: 'лв',
        PAB: 'B/.',
        TTD: 'TT$',
        HNL: 'L',
        MZN: 'MT',
        LBP: '£',
        UAH: '₴',
        ILS: '₪',
        PHP: '₱',
        SGD: '$',
        NAD: '$',
        NZD: '$',
        PLN: 'zł',
        BRL: 'R$',
        NIO: 'C$',
        QAR: '﷼',
        SRD: '$',
        KZT: 'лв',
        BAM: 'KM',
        NGN: '₦',
        OMR: '﷼',
        LRD: '$',
        MNT: '₮',
        TWD: '$',
        MYR: 'RM',
        LKR: '₨',
        PEN: 'S/.',
        ISK: 'kr',
        ALL: 'Lek',
        AFN: '؋',
        BMD: '$',
        EGP: '£',
        BWP: 'P',
        KPW: '₩',
        CRC: '₡',
        HKD: '$',
        GTQ: 'Q',
        CNY: '¥',
        JMD: 'J$',
        LAK: '₭',
        COP: '$',
        MUR: '₨',
        ANG: 'ƒ',
        AZN: '₼',
        CZK: 'Kč',
        GIP: '£',
        KRW: '₩',
        BSD: '$',
        BYN: 'Br',
        FJD: '$',
        MKD: 'ден',
        HRK: 'kn',
        DKK: 'kr',
        AWG: 'ƒ',
        CUP: '₱',
        BZD: 'BZ$',
        CLP: '$',
        GHS: '¢',
        HUF: 'Ft',
        DOP: 'RD$',
        IRR: '﷼',
        EUR: '€',
        GYD: '$',
        GBP: '£',
        FKP: '£',
        IDR: 'Rp',
        JPY: '¥',
        USD: '$',
        CHF: 'CHF',
        CAD: '$',
        INR: '₹',
        ZAR: 'R',
        XCD: '$',
        RON: 'lei',
        PYG: 'Gs',
        THB: '฿',
        SVC: '$',
        SCR: '₨',
        YER: '﷼',
        SOS: 'S',
        SEK: 'kr',
        SBD: '$',
        PKR: '₨',
        MXN: '$',
        NPR: '₨',
        VND: '₫',
        UYU: '$U',
        RSD: 'Дин.',
        UZS: 'лв',
        TRY: '₺',
        SYP: '£',
        SHP: '£'
      };
    
      // ---------------------------------------------------------------------------
      // Scrolling ticker
      // ---------------------------------------------------------------------------
      (function() {
        let widgets = document.getElementsByClassName('livecoinwatch-widget-5');
        for (let i = 0; i < widgets.length; i++) {
          let widget = widgets.item(i);
          if (!widget) return;
    
          let base          = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
          let mrq1          = (widget.getAttribute('lcw-marquee-1') || 'coins').toLowerCase();
          let mrq2          = (widget.getAttribute('lcw-marquee-2') || 'none').toLowerCase();
          let marqueeItems  = (widget.getAttribute('lcw-marquee-items') || '10');
          let txColor       = (widget.getAttribute('lcw-color-tx') || '#000000');
          let dark = true;
    
          if (mrq1 !== 'coins' && mrq1 !== 'movers') mrq1 = 'coins';
          if (mrq2 !== 'coins' && mrq2 !== 'movers') mrq2 = 'none';
          if (marqueeItems !== '10' && marqueeItems !== '20' && marqueeItems !== '30') marqueeItems = 10;
          else marqueeItems = Number.parseInt(marqueeItems);
    
          // Styles ------------------------------------------------------------------
          let widgetTheme   = s([widgetBannerStyle]);
          let textTheme     = s([textDarkStyle, 'color:' + txColor]);
          let subtextTheme  = dark ? subtextDarkStyle : subtextStyle;
          let linkTheme     = dark ? linkDarkStyle : linkStyle;
    
          let animation = document.createElement('style');
          animation.type = 'text/css';
          animation.innerHTML = '@keyframes scroll { 0% { transform: translate3d(' + (marqueeItems * 186) + 'px,0,0) } 100% { transform: translate3d(-180px,0,0) } }';
    
          document.getElementsByTagName('head')[0].appendChild(animation);
    
          // Append child divs -------------------------------------------------------
          let anchor = c('a');
          let row1 = c('div', vsRowStyle);
          let row2 = c('div', vsRowStyle);
          let marquees = [];
    
          widget.innerHTML = '';
          widget.setAttribute('style', widgetTheme);
          anchor.href = 'https://www.livecoinwatch.com/';
          anchor.target = '_blank';
    
          append(anchor, [row1, row2])
          append(widget, [anchor]);
    
          window.addEventListener('resize', function() {
            widget.style.width = window.innerWidth;
            marquees.forEach(function(e) {
              if (e.style.webkitAnimationPlayState === 'running') {
                e.style.webkitAnimationPlayState = 'paused';
                setTimeout(function() {
                  e.style.webkitAnimationPlayState = 'running';
                }, 200);
              }
            });
          });
    
          widget.addEventListener('mouseover', function(e) {
            marquees.forEach(function(e) {
              if (e.style.webkitAnimationPlayState === 'running')
                e.style.webkitAnimationPlayState = 'paused';
            });
          });
          widget.addEventListener('mouseout', function(e) {
            marquees.forEach(function(e) {
              if (e.style.webkitAnimationPlayState === 'paused')
                e.style.webkitAnimationPlayState = 'running';
            });
          });
    
          if (mrq1 !== 'none') {
            for (let j = 0; j < marqueeItems; j++) {
              let dur     = (marqueeItems / 10) * 30;
              let marquee = c('div', [marqueeStyle, pAbsoluteStyle, rl(-180), an(dur), ad(j * 3)]);
              let row     = c('div', marqueeCellStyle);
              let text    = c('div', [cellStyle, dTableStyle]);
              let price   = c('span', [textStyle, textTheme, pRelativeStyle, rt(12), rl(5)]);
              let delta   = c('span', [smTextStyle, textTheme, pRelativeStyle, rt(10), rl(10)]);
              let img     = c('img', [smImgStyle, 'height: 24px', pt(9)]);
              append(text, [price, delta]);
              append(row, [img, text]);
              append(marquee, row);
              append(row1, marquee);
              marquees.push(marquee);
            }
          }
    
          if (mrq2 !== 'none') {
            for (let j = 0; j < marqueeItems; j++) {
              let dur   = (marqueeItems / 10) * 25;
              let marquee = c('div', [subMarqueeStyle, pAbsoluteStyle, rl(-180), an(dur), ad(j * 2.5)]);
              let row     = c('div', marqueeCellStyle);
              let text    = c('div', [cellStyle, dTableStyle]);
              let price   = c('span', [smTextStyle, textTheme, pRelativeStyle, rl(5)]);
              let delta   = c('span', [smTextStyle, textTheme, pRelativeStyle, rl(10)]);
              let symbol  = c('span', [smTextStyle, textTheme]);
              append(row, symbol);
              append(text, [price, delta]);
              append(row, text);
              append(marquee, row);
              append(row2, marquee);
              marquees.push(marquee);
            }
          }
    
          // Fetch prices ------------------------------------------------------------
          function fetchPrice(isMain) {
            let topUrl = getTopUrl(marqueeItems, base);
            fetch(topUrl, function(response) {
              let data = response.data;
              if (!data)
                return console.log('Invalid marquee response!', topUrl);
              let rows = isMain ? row1 : row2;
              for (let index = 0; index < marqueeItems; index++) {
                let row = rows.children[index];
                let price = row.children[0].children[1].children[0];
                let delta = row.children[0].children[1].children[1];
                if (isMain) {
                  let img = row.children[0].children[0];
                  img.src = getImgUrl(data[index].code);
                } else {
                  let code = row.children[0].children[0];
                  code.innerHTML = parseCode(data[index].code);
                }
                price.innerHTML = formatPrice(data[index].price, base);
                formatDeltaInline(delta, data[index].delta.day, dark);
              }
            });
          }
    
          // Fetch gainers and losers -------------------------------------------------
          function fetchMovers(isMain) {
            let moversUrl = getMoversUrl(marqueeItems, base);
            fetch(moversUrl, function(response) {
              if (!response.gainers || !response.losers)
                return console.log('Invalid marquee response!', moversUrl);
              let data = response.gainers.slice(0, marqueeItems / 2).concat(response.losers.slice(0, marqueeItems / 2));
              let rows = isMain ? row1 : row2;
              for (let index = 0; index < marqueeItems; index++) {
                let row = rows.children[index];
                let price = row.children[0].children[1].children[0];
                let delta = row.children[0].children[1].children[1];
                if (isMain) {
                  let img = row.children[0].children[0];
                  img.src = data.length <= marqueeItems ? getImgUrl(data[index].code) : '';
                } else {
                  let code = row.children[0].children[0];
                  code.innerHTML = data.length <= marqueeItems ? parseCode(data[index].code) : '';
                }
                if (data.length <= marqueeItems) {
                  price.innerHTML = formatPrice(data[index].price, base);
                  formatDeltaInline(delta, data[index].delta.day, dark);
                } else {
                  price.innerHTML = '';
                  delta.innerHTML = '';
                }
              }
            });
          }
    
          function fetchData() {
            if (mrq1 === 'coins') fetchPrice(true);
            else if (mrq1 === 'movers') fetchMovers(true);
    
            if (mrq2 === 'coins') fetchPrice(false);
            else if (mrq2 === 'movers') fetchMovers(false);
          }
    
          fetchData();
          wpi5 = setInterval(fetchData, TIMEOUT);
        }
      })();
    
      // ---------------------------------------------------------------------------
      // Movers
      // ---------------------------------------------------------------------------
      (function() {
    
        // Obtain widget reference and settings ------------------------------------
        let widget = document.getElementById('livecoinwatch-widget-4');
    
        if (!widget) return;
    
        let base  = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
        let dark  = (widget.getAttribute('lcw-theme') || 'light').toLowerCase() === 'dark';
        let dHead = (widget.getAttribute('lcw-d-head') || 'false').toLowerCase() === 'true';
        let dName = (widget.getAttribute('lcw-d-name') || 'true').toLowerCase() === 'true';
        let dCode = (widget.getAttribute('lcw-d-code') || 'true').toLowerCase() === 'true';
        let dIcon = (widget.getAttribute('lcw-d-icon') || 'true').toLowerCase() === 'true';
    
        // Need to show something.
        if (!dCode && !dIcon) dName = true;
    
        // API urls ----------------------------------------------------------------
        let moversUrl = '';//getMoversUrl();
    
        // Styles ------------------------------------------------------------------
        let widgetTheme = widgetTallStyle + (dark ? (';' + widgetDarkStyle ) : '');
        let textTheme = (dark ? textDarkStyle : '');
        let subtextTheme = dark ? subtextDarkStyle : subtextStyle;
        let linkTheme = dark ? linkDarkStyle : linkStyle;
    
        // Append child divs -------------------------------------------------------
        let row1      = c('div', [lgTopStyle, pt(0)], getLargeLogo(dark));
        let row2      = c('div', [smRowStyle, 'height: 16px', mt(15)]);
        let row3      = c('div', [smRowStyle, 'height: 16px', mt(8)]);
        let rows1     = c('div', '');
        let rows2     = c('div', '');
        let gainers   = c('p', [divHeaderStyle, 'border-color: ' + (dark ? 'transparent' : '#d4d4d5')]);
        let losers    = c('p', [divHeaderStyle, 'border-color: ' + (dark ? 'transparent' : '#d4d4d5')]);
        let gainLabel = c('div', mt(-10));
        let loseLabel = c('div', dark ? mt(-2) : mt(-10));
        let gainText  = c('p', [smTextStyle, subtextStyle, subtextTheme, mAutoStyle, pt(3), wpx(85), bg(dark ? '#1f2434' : 'white')], 'GAINERS');
        let loseText  = c('p', [smTextStyle, subtextStyle, subtextTheme, mAutoStyle, pt(3), wpx(85), bg(dark ? '#1f2434' : 'white')], 'LOSERS');
    
        widget.innerHTML = '';
        widget.setAttribute('style', widgetTheme);
    
        append(gainers, gainLabel);
        append(losers, loseLabel);
        append(gainLabel, gainText);
        append(loseLabel, loseText);
        append(row2, gainers);
        append(row3, losers);
    
        append(widget, [row1, row2, rows1, row3, rows2]);
    
        // TODO: Dynamic uri
        // anchor.href = 'https://www.livecoinwatch.com/';
    
        // Fetch gainers and losers -------------------------------------------------
        (function fetchMovers() {
          fetch(moversUrl, function(data) {
            setTimeout(fetchMovers, TIMEOUT);
            if (!data)
              return console.log('Invalid top response!', topUrl);
    
            rows1.innerHTML = '';
            rows2.innerHTML = '';
    
            data = data.gainers.concat(data.losers);
    
            data.forEach(function(e, i) {
    
              let themedRowStyle = dark
                ? (i % 2 ? borderRowDark1Style : borderRowDark2Style)
                : (i % 5 ? borderRowStyle : borderlessRowStyle);
    
              let row     = c('div', themedRowStyle);
              let imgCell = c('div', 'width: 10%');
              let img     = c('img', [smImgStyle, pt(8)]);
              let title   = c('div', [dTableStyle, pl(10), pRelativeStyle, !dName || !dCode ? rt(5) : '']);
              let name    = c('div', [textStyle, textTheme, ellipsisStyle, 'width: 140px'], dName ? e.name : parseCode(e.code));
              let symbol  = c('p', [smTextStyle, subtextTheme], parseCode(e.code));
              let prices  = c('div', [dTableStyle, pl(10), 'width: 25%; text-align: right']);
              let price   = c('p', [textStyle, textTheme, pRelativeStyle, rt(5)], formatPrice(e.price, base));
              let deltas  = c('div', [dTableStyle, pl(5), 'width: 15%']);
              let delta   = c('p', [smTextStyle, textTheme, smCellStyle, pRelativeStyle, rt(4)]);
    
              if (dIcon)
                img.src = getImgUrl(e.code);
    
              if (dName || dCode) append(title, name);
              if (dName && dCode) append(title, symbol);
    
              append(imgCell, img);
              append(prices, price);
              append(deltas, delta)
              append(row, [imgCell, title, prices, deltas]);
    
              if (i < 5) append(rows1, row);
              else append(rows2, row);
    
              formatDeltaInline(delta, 1 + (e.change / 100), dark);
    
            });
    
          });
        })();
    
      })();
    
      // ---------------------------------------------------------------------------
      // Total market
      // ---------------------------------------------------------------------------
      (function() {
    
        // Obtain widget reference and settings ------------------------------------
        let widget = document.getElementById('livecoinwatch-widget-2');
    
        if (!widget) return;
    
        let base      = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
        let period    = (widget.getAttribute('lcw-period') || 'd').toLowerCase();
        let txColor   = (widget.getAttribute('lcw-color-tx') || '#000000');
        let prColor   = (widget.getAttribute('lcw-color-pr') || '#58c7c5');
        let bgColor   = (widget.getAttribute('lcw-color-bg') || '#ffffff');
        let dark      = true;
    
        // API urls ----------------------------------------------------------------
        let histUrl   = getTotalHistUrl(period);
    
        // Styles ------------------------------------------------------------------
        let widgetTheme = widgetStyle + (dark ? ';' + widgetDarkStyle : '');
        let textTheme = (dark ? textDarkStyle : '');
        let subtextTheme = dark ? subtextDarkStyle : subtextStyle;
        let linkTheme = dark ? linkDarkStyle : linkStyle;
    
        // Append child divs -------------------------------------------------------
        let row1    = c('div', topStyle);
        let row2    = c('div', footerStyle);
        let labels  = c('div', titleStyle);
        let capLabel= c('p', [smTextStyle, textTheme, cellStyle], 'MARKET CAP');
        let volLabel= c('p', [smTextStyle, textTheme, cellStyle], '24H VOLUME');
        let figures = c('div', priceStyle);
        let cap     = c('p', [lgTextStyle, textTheme, cellStyle], '-');
        let vol     = c('p', [lgTextStyle, textTheme, cellStyle], '-');
        let deltas  = c('div', priceStyle);
        let delta   = c('p', [smTextStyle, textTheme, cellStyle, 'text-align: right'], '-');
        let delta2  = c('p', [smTextStyle, textTheme, cellStyle, 'text-align: right'], '-');
        let leftCol = c('div', leftStyle, getSmallLogo());
        let rightCol= c('div', rightStyle);
        let anchor  = c('a', [anchorStyle, linkStyle, 'color:' + prColor]);
        let label   = c('p', [smTextStyle, subtextTheme, pr(5)], getPeriodLabel(period));
        let chart   = c('div', chartStyle);
    
        widget.innerHTML = '';
        widget.setAttribute('style', widgetTheme);
    
        // TODO: Dynamic uri
        anchor.href = 'https://www.livecoinwatch.com/';
        anchor.target = '_blank';
    
        append(labels, [capLabel, volLabel]);
        append(figures, [cap, vol]);
        append(deltas, [delta, delta2]);
        append(leftCol, anchor);
        append(rightCol, label);
        append(row1, [labels, deltas, figures]);
        append(row2, [leftCol, rightCol]);
        append(widget, [row1, chart, row2]);
    
        // Fetch historical prices -------------------------------------------------
        (function fetchHist() {
          fetch(histUrl, function(json) {
    
            if (!json || json.hist.length === 0)
              return;
    
            setTimeout(fetchHist, TIMEOUT);
    
            let data = json.hist;
            let stats = json.stats;
            let points = [];
            let min = Number.MAX_SAFE_INTEGER;
            let max = 0;
    
            // Current stats.
            cap.innerHTML = formatUnit(formatAbr(stats.capNow), base);
            vol.innerHTML = formatUnit(formatAbr(stats.volNow), base);
    
            formatDeltaInline(delta, 1 + ((stats.capNow - data[data.length - 2].cap) / stats.capNow), dark);
            formatDeltaInline(delta2, 1 + ((stats.volNow - data[data.length - 2].volume) / stats.volNow), dark);
    
            // Splice the request period.
            let startDate = new Date((new Date).getTime() - (PERIODS[period] || PERIODS[0]).t);
            data = data.filter(function(e) {
              return (new Date(e.date)).getTime() > startDate.getTime();
            });
    
            data.forEach(function(e, i) {
              if (e.cap > max) max = e.cap;
              if (e.cap < min) min = e.cap;
            });
    
            data.forEach(function(e, i) {
              let range = max - min;
              points.push({
                x: ((i / data.length) * 385),
                y: 95 - Math.floor(((e.cap - min) / range) * 90),
                cap: e.cap,
                date: e.date
              });
            });
    
            // Add 4 points outside the bounds to fill the chart.
            let textPoints = points.map(function(e) {
              return e.x + ',' + (isNaN(e.y) ? 0 : e.y);
            }).join(' ');
            textPoints += ' 385,' + points[points.length - 1].y + ' 385,140 -5,140 -5,' + points[0].y;
    
            let fill = dark ? '#283d4b' : '#d8f1f0';
    
            let circle = cn('http://www.w3.org/2000/svg', 'circle', 'fill: #58c7c5;');
            circle.setAttribute('r', 0);
    
            // Create chart.
            chart.innerHTML = '<svg height="150" width="380">'
              + '<polyline style="fill:' + fill + '; stroke: #58c7c5; stroke-width: 2" points="'
              + textPoints + '"/>'
              + '</svg>';
    
            append(chart.firstChild, circle);
    
            // Highlight the point closest to the mouse position.
            let pt = chart.firstChild.createSVGPoint();
            chart.firstChild.addEventListener('mousemove', function(e) {
              pt.x = e.clientX;
              pt.y = e.clientY;
              let point = pt.matrixTransform(chart.firstChild.getScreenCTM().inverse());
    
              circle.setAttribute('r', 5);
    
              let selected;
              for (let i = 0; i < points.length; i++) {
                if (points[i].x > point.x) {
                  let below = points[Math.max(i - 1, 0)];
                  if (point.x - below < points[i].x - point.x) selected = points[i - 1];
                  else selected = points[i];
                  circle.setAttribute('cx', selected.x);
                  circle.setAttribute('cy', selected.y);
                  break;
                }
              }
    
              // Display date and price in footer label.
              label.innerHTML = formatDate(new Date(selected.date)) + '&nbsp;-&nbsp;' + formatAbr(selected.cap);
    
            });
    
            // Remove highlight on mouse out.
            chart.firstChild.addEventListener('mouseout', function(e) {
              circle.setAttribute('r', 0);
              label.innerHTML = (PERIODS[period] || PERIODS[0]).l;
            });
    
          });
        })();
    
      })();
    
      // ---------------------------------------------------------------------------
      // Top 10 Coins
      // ---------------------------------------------------------------------------
      (function() {
        let widgets = document.getElementsByClassName('livecoinwatch-widget-3');
        for (let i = 0; i < widgets.length; i++) {
          let widget = widgets.item(i);
          if (!widget) return;
    
          let base    = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
          let txColor = (widget.getAttribute('lcw-color-tx') || '#000000');
          let prColor = (widget.getAttribute('lcw-color-pr') || '#58c7c5');
          let bgColor = (widget.getAttribute('lcw-color-bg') || '#ffffff');
          let bWidth  = (widget.getAttribute('lcw-border-w') || '1') + 'px';
          let dHead   = (widget.getAttribute('lcw-d-head') || 'false').toLowerCase() === 'true';
          let dName   = (widget.getAttribute('lcw-d-name') || 'true').toLowerCase() === 'true';
          let dCode   = (widget.getAttribute('lcw-d-code') || 'true').toLowerCase() === 'true';
          let dIcon   = (widget.getAttribute('lcw-d-icon') || 'true').toLowerCase() === 'true';
          let dark    = true;
    
          // Need to show something.
          if (!dCode && !dIcon) dName = true;
    
          // API urls ----------------------------------------------------------------
          let topUrl    = getTopUrl(10, base);
          let totalsUrl = getTotalsUrl(base);
    
          // Styles ------------------------------------------------------------------
          let borderColor = editColor(bgColor, -20);
          let widgetTheme = s([widgetTallStyle, 'background-color:' + bgColor, 'border-color:' + borderColor, 'border-width:' + bWidth]);
          let textTheme = s([textDarkStyle, 'color:' + txColor]);
          let subtextTheme = s([subtextDarkStyle, 'color:' + txColor + '64']);
    
          // Append child divs -------------------------------------------------------
          let row1      = c('div', dHead ? lgTopStyle : lgTopFullStyle);
          let row2      = c('div', [smRowStyle]);
          let rows      = c('div', '');
          let col1      = c('div', [cellStyle, dTableStyle, 'width: 50%']);
          let col2      = c('div', [cellStyle, dTableStyle, 'width: 50%']);
          let anchor    = c('a', [anchorStyle, linkStyle, 'color:' + prColor], getLargeLogo(txColor));
          let capLabel  = c('p', [smTextStyle, subtextTheme, textLeftStyle, ml(20), 'font-size: 10px'], 'MARKET CAP');
          let volLabel  = c('p', [smTextStyle, subtextTheme, textRightStyle, mr(20), 'font-size: 10px'], '24H VOLUME');
          let cap       = c('p', [smTextStyle, textTheme, textLeftStyle, pt(2), ml(20)], '-');
          let vol       = c('p', [smTextStyle, textTheme, textRightStyle, pt(2), mr(20)], '-');
    
          widget.innerHTML = '';
          widget.setAttribute('style', widgetTheme);
    
          if (dHead) {
            append(col1, [capLabel, cap]);
            append(col2, [volLabel, vol]);
            append(row2, [col1, col2]);
          }
    
          append(row1, anchor);
          append(widget, row1);
          if (dHead) append(widget, row2);
          append(widget, rows);
    
          anchor.href = 'https://www.livecoinwatch.com/';
          anchor.target = '_blank';
    
          for (let index = 0; index < 10; index++) {
            let row     = c('div', [borderRowStyle, 'border-color: #00000042']);
            let imgCell = c('div', 'width: 10%');
            let img     = c('img', [smImgStyle, pt(8)]);
            let title   = c('div', [dTableStyle, pl(10), 'width: 22%', pRelativeStyle, !dName || !dCode ? rt(5) : '']);
            let symbol  = c('p', [textStyle, textTheme, !dCode ? 'font-size: 13px' : '']);
            let name    = c('p', [smTextStyle, subtextTheme, ellipsisStyle, 'width: 80px']);
            let prices  = c('div', [dTableStyle, pl(10), 'width: 45%; text-align: right']);
            let price   = c('p', [textStyle, textTheme, pRelativeStyle, rt(5)]);
            let deltas  = c('div', [dTableStyle, pl(5)]);
            let delta   = c('p', [smTextStyle, textTheme, smCellStyle, pRelativeStyle, rt(4)]);
    
            if (dName || dCode) append(title, symbol);
            if (dName && dCode) append(title, name);
    
            append(imgCell, img);
            append(prices, price);
            append(deltas, delta)
            append(row, [imgCell, title, prices, deltas]);
            append(rows, row);
          }
    
          // Fetch prices ------------------------------------------------------------
          function fetchPrice() {
            fetch(topUrl, function(response) {
              if (!response || !response.data)
                return console.log('Invalid top response!', topUrl);
    
              let data = response.data;
              for (let index = 0; index < 10; index++) {
                let row = rows.children[index];
                let price = row.children[2].children[0];
                let delta = row.children[3].children[0];
                let title = row.children[1];
                if (dName) {
                  let name = dCode ? title.children[1] : title.children[0];
                  name.innerHTML = dName ? data[index].name : parseCode(data[index].code);
                }
                if (dCode) {
                  let code = title.children[0];
                  code.innerHTML = parseCode(data[index].code);
                }
                if (dIcon) {
                  let img = row.children[0].children[0];
                  img.src = getImgUrl(data[index].code);
                }
                price.innerHTML = formatPrice(data[index].price, base);
                formatDeltaInline(delta, data[index].delta.day, dark);
              }
            });
          }
    
          // Fetch totals ------------------------------------------------------------
          function fetchTotals() {
            fetch(totalsUrl, function(response) {
              if (!response || !response.cap || !response.volume)
                return console.log('Invalid totals response!', totalsUrl);
              cap.innerHTML = formatUnit(formatAbr(response.cap), base);
              vol.innerHTML = formatUnit(formatAbr(response.volume), base);
            });
          }
    
          function fetchData() {
            fetchPrice();
            fetchTotals();
          }
    
          fetchData();
          wpi3 = setInterval(fetchData, TIMEOUT);
        }
      })();
    
      // ---------------------------------------------------------------------------
      // Single coin chart
      // ---------------------------------------------------------------------------
      (function() {
        let widgets = document.getElementsByClassName('livecoinwatch-widget-1');
        for (let i = 0; i < widgets.length; i++) {
          let widget = widgets.item(i);
          if (!widget) return;
    
          let coin      = (widget.getAttribute('lcw-coin') || 'BTC').toLowerCase();
          let base      = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
          let secondary = (widget.getAttribute('lcw-secondary') || 'none').toLowerCase();
          let period    = (widget.getAttribute('lcw-period') || 'd').toLowerCase();
          let digits    = (widget.getAttribute('lcw-digits') || 'none');
          let txColor   = (widget.getAttribute('lcw-color-tx') || '#000000');
          let prColor   = (widget.getAttribute('lcw-color-pr') || '#58c7c5');
          let bgColor   = (widget.getAttribute('lcw-color-bg') || '#ffffff');
          let bWidth    = (widget.getAttribute('lcw-border-w') || '1') + 'px';
          let dark = true;
    
          // API urls ----------------------------------------------------------------
          let priceUrl  = getPriceUrl(coin, base, secondary);
          let histUrl   = getHistUrl(coin, period, base);
    
          // Styles ------------------------------------------------------------------
          let borderColor   = editColor(bgColor, -20);
          let widgetTheme   = s([widgetStyle, 'background-color:' + bgColor, 'border-color:' + borderColor, 'border-width:' + bWidth]);
          let textTheme     = s([textDarkStyle, 'color:' + txColor]);
          let subtextTheme  = s([subtextDarkStyle, 'color:' + txColor + '64']);
          let linkTheme     = linkStyle;
    
          // Append child divs -------------------------------------------------------
          let row1    = c('div', topStyle);
          let row2    = c('div', footerStyle);
          let img     = c('img', imgStyle);
          let title   = c('div', titleStyle);
          let name    = c('p', [smTextStyle, subtextTheme, ellipsisStyle, 'width: 100px'], '-');
          let symbol  = c('p', [lgTextStyle, textTheme], '-');
          let prices  = c('div', [priceStyle, 'text-align: right']);
          let price   = c('p', [lgTextStyle, textTheme], '-');
          let deltas  = c('div', [priceStyle, 'text-align: right']);
          let delta   = c('p', [smTextStyle, textTheme, smCellStyle], '-');
          let delta2  = c('p', [smTextStyle, textTheme, smCellStyle], '-');
          let price2  = c('p', [smTextStyle, subtextTheme]);
          let leftCol = c('div', leftStyle, getSmallLogo(prColor));
          let rightCol= c('div', rightStyle);
          let anchor  = c('a', [anchorStyle, linkTheme, 'color:' + prColor], parseCode(coin.toUpperCase()) + ' Price Charts');
          let label   = c('p', [chartLabelStyle, smTextStyle, subtextTheme, 'padding-right: 10px'], (PERIODS[period] || PERIODS[0]).l);
          let chart   = c('div', [chartStyle, base === coin ? 'visibility: hidden' : '']);
    
          widget.innerHTML = '';
          widget.setAttribute('style', widgetTheme);
    
          img.src = getImgUrl(coin);
    
          append(title, [symbol, name]);
          append(prices, [price, price2]);
          append(deltas, [delta, delta2]);
          append(leftCol, anchor);
          append(rightCol, label);
          append(row1, [img, title, deltas, prices]);
          append(row2, [leftCol, rightCol]);
          append(widget, [row1, chart, row2]);
    
          // Fetch prices ------------------------------------------------------------
          function fetchPrice() {
            fetch(priceUrl, function(response) {
              if (!response || !response.success)
                return console.log('Invalid price response!', priceUrl);
    
              let data = response.data.find(function(e) { return e.code === coin.toUpperCase(); });
              let data2 = response.data.find(function(e) { return e.code === secondary.toUpperCase(); });
    
              if (!data || (secondary && secondary !== 'none' && !data2))
                return;
    
              // Name and symbol.
              name.innerHTML = data.name;
              symbol.innerHTML = parseCode(data.code);
              anchor.href = getCoinUrl(data.name, data.code);
              anchor.target = '_blank';
    
              // Price and main delta.
              price.innerHTML = formatPrice(data.price, response.currency, digits);
              formatDeltaInline(delta, getDelta(data.delta, period), dark);
    
              // Optional secondary price and delta.
              if (secondary && secondary !== 'none') {
    
                let secondaryDigits = Number.isFinite(Number.parseInt(digits)) ? digits : 9;
                price2.innerHTML = formatPrice(data.price / data2.price, secondary, Math.max(secondaryDigits, 9));
    
                let old = data.price / getDelta(data.delta, period);
                let oldBase = data2.price / getDelta(data2.delta, period);
    
                formatDeltaInline(delta2, (data.price / data2.price) / (old / oldBase), dark);
    
              } else {
                price2.innerHTML = '';
                delta2.innerHTML = '';
              }
            });
          }
    
          fetchPrice();
          wpi1 = setInterval(fetchPrice, TIMEOUT);
    
          // Fetch historical prices -------------------------------------------------
          function fetchHist() {
            fetch(histUrl, function(json) {
              if (!json || !json.success || json.data.length === 0)
                return;
    
              let data = json.data;
              let points = [];
              let min = Number.MAX_SAFE_INTEGER;
              let max = 0;
    
              data.forEach(function(e, i) {
                if (!(i % 5)) {
                  if (e.rate > max) max = e.rate;
                  if (e.rate < min) min = e.rate;
                }
              });
    
              data.forEach(function(e, i) {
                if (!(i % 5)) {
                  let range = max - min;
                  points.push({
                    x: ((i / data.length) * 385),
                    y: 95 - Math.floor(((e.rate - min) / range) * 90),
                    rate: e.rate,
                    date: e.date
                  });
                }
              });
    
              // Add 4 points outside the bounds to fill the chart.
              let textPoints = points.map(function(e) {
                return e.x + ',' + (isNaN(e.y) ? 0 : e.y);
              }).join(' ');
              textPoints += ' 385,' + points[points.length - 1].y + ' 385,140 -5,140 -5,' + points[0].y;
    
              let fill = prColor + '25';
    
              let circle = cn('http://www.w3.org/2000/svg', 'circle', 'fill:' + prColor);
              circle.setAttribute('r', 0);
    
              // Create chart.
              chart.innerHTML = '<svg height="150" width="380">'
                + '<polyline style="fill:' + fill + '; stroke:' + prColor + '; stroke-width: 2" points="'
                + textPoints + '"/>'
                + '</svg>';
    
              append(chart.firstChild, circle);
    
              // Highlight the point closest to the mouse position.
              let pt = chart.firstChild.createSVGPoint();
              chart.firstChild.addEventListener('mousemove', function(e) {
                pt.x = e.clientX;
                pt.y = e.clientY;
                let point = pt.matrixTransform(chart.firstChild.getScreenCTM().inverse());
    
                circle.setAttribute('r', 5);
    
                let selected;
                for (let i = 0; i < points.length; i++) {
                  if (points[i].x > point.x) {
                    let below = points[Math.max(i - 1, 0)];
                    if (point.x - below < points[i].x - point.x) selected = points[i - 1];
                    else selected = points[i];
                    circle.setAttribute('cx', selected.x);
                    circle.setAttribute('cy', selected.y);
                    break;
                  }
                }
    
                // Display date and price in footer label.
                label.innerHTML = formatDateAndTime(selected.date) + '&nbsp;-&nbsp;' + formatPrice(selected.rate, base);
    
              });
    
              // Remove highlight on mouse out.
              chart.firstChild.addEventListener('mouseout', function(e) {
                circle.setAttribute('r', 0);
                label.innerHTML = (PERIODS[period] || PERIODS[0]).l;
              });
    
            });
          }
    
          fetchHist();
          whi1 = setInterval(fetchHist, HIST_TIMEOUT);
        }
      })();
    
      // ---------------------------------------------------------------------------
      // Single coin mini
      // ---------------------------------------------------------------------------
      (function() {
        let widgets = document.getElementsByClassName('livecoinwatch-widget-6');
        for (let i = 0; i < widgets.length; i++) {
          let widget = widgets.item(i);
          if (!widget) return;
    
          let coin      = (widget.getAttribute('lcw-coin') || 'BTC').toLowerCase();
          let base      = (widget.getAttribute('lcw-base') || 'USD').toLowerCase();
          let period    = (widget.getAttribute('lcw-period') || 'd').toLowerCase();
          let txColor   = (widget.getAttribute('lcw-color-tx') || '#000000');
          let prColor   = (widget.getAttribute('lcw-color-pr') || '#58c7c5');
          let bgColor   = (widget.getAttribute('lcw-color-bg') || '#ffffff');
          let bWidth    = (widget.getAttribute('lcw-border-w') || '1') + 'px';
          let dark = true;
    
          // API urls ----------------------------------------------------------------
          let priceUrl  = getPriceUrl(coin, base);
    
          // Styles ------------------------------------------------------------------
          let borderColor   = editColor(bgColor, -20);
          let widgetTheme   = s([widgetMiniStyle, 'background-color:' + bgColor, 'border-color:' + borderColor, 'border-width:' + bWidth]);
          let textTheme     = s([textDarkStyle, 'color:' + txColor]);
          let subtextTheme  = s([subtextDarkStyle, 'color:' + txColor + '64']);
          let linkTheme     = linkStyle;
    
          let timeframeText = '';
          if (period === 'd') timeframeText = '24hr';
          else if (period === 'w') timeframeText = '7d';
          else if (period === 'm') timeframeText = '30d';
    
          // Append child divs -------------------------------------------------------
          let row1      = c('a');
          let inner     = c('div', ['pointer-events: none', 'height: 60px', 'padding-top: 8px']);
          let img       = c('img', imgStyle);
          let title     = c('div', titleStyle);
          let name      = c('p', [smTextStyle, subtextTheme, ellipsisStyle, 'width: 100px'], '-');
          let symbol    = c('p', [lgTextStyle, textTheme, 'padding-top: 4px'], '-');
          let prices    = c('div', [priceStyle, 'text-align: right', 'padding-top: 4px']);
          let price     = c('p', [lgTextStyle, textTheme], '-');
          let row2      = c('div');
          let delta     = c('span', [smTextStyle, subtextTheme], '-');
          let timeframe = c('span', [smTextStyle, subtextTheme, 'padding-left: 5px'], timeframeText);
    
          widget.innerHTML = '';
          widget.setAttribute('style', widgetTheme);
    
          img.src = getImgUrl(coin);
    
          append(title, [symbol, name]);
          append(row2, [delta, timeframe]);
          append(prices, [price, row2]);
          append(inner, [img, title, prices]);
          append(row1, [inner]);
          append(widget, [row1]);
    
          // Fetch prices ------------------------------------------------------------
          function fetchPrice() {
            fetch(priceUrl, function(response) {
              if (!response || !response.success)
                return console.log('Invalid price response!', priceUrl);
    
              let data = response.data.find(function(e) { return e.code === coin.toUpperCase(); });
              if (!data)
                return;
    
              // Name and symbol.
              name.innerHTML = data.name;
              symbol.innerHTML = parseCode(data.code);
              row1.href = getCoinUrl(data.name, data.code);
              row1.target = '_blank';
    
              // Price and main delta.
              price.innerHTML = formatPrice(data.price, response.currency);
              formatDeltaInline(delta, getDelta(data.delta, period), dark);
            });
          }
    
          fetchPrice();
          wpi6 = setInterval(fetchPrice, TIMEOUT);
        }
      })();
    
      // ---------------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------------
      function append(p, c) {
        if (c.constructor === Array) {
          c.forEach(function(e) {
            p.appendChild(e);
          });
        } else p.appendChild(c);
      }
    
      function c(t, s, h) {
        let e = document.createElement(t);
        if (s) e.setAttribute('style', css() + ';' + (s.constructor === Array ? s.join(';') : s))
        if (h) e.innerHTML = h;
        return e;
      }
    
      function cn(n, t, s, h) {
        let e = document.createElementNS(n, t);
        if (s) e.setAttribute('style', s);
        if (h) e.innerHTML = h;
        return e;
      }
    
      function s(a) {
        return a.join(';');
      }
    
      function getPriceUrl(coin, base, secondary) {
        return 'https://http-api.livecoinwatch.com/widgets/coins?only='
          + coin.toUpperCase()
          + (secondary && secondary !== 'none' ? ',' + secondary.toUpperCase() : '')
          + '&currency=' + base.toUpperCase()
          + '&location=' + window.location.href;
      }
    
      function getTotalHistUrl(coin, p) {
        return 'https://www.livecoinwatch.com/overview'; // TODO
      }
    
      function getHistUrl(coin, p, base) {
        let period = (PERIODS[p] || PERIODS[0]).t;
        let end = (new Date).getTime();
        let start = end - period;
        return 'https://http-api.livecoinwatch.com/widgets/coins/history/range'
          + '?coin=' + coin.toUpperCase()
          + '&start=' + start
          + '&end=' + end
          + '&currency=' + base.toUpperCase()
          + '&location=' + window.location.href;
      }
    
      function getTopUrl(limit, base) {
        return 'https://http-api.livecoinwatch.com/widgets/coins?sort=cap&order=descending'
          + '&limit=' + limit
          + '&currency=' + base.toUpperCase()
          + '&location=' + window.location.href;
      }
    
      function getTotalsUrl(base) {
        return 'https://http-api.livecoinwatch.com/widgets/stats'
          + '?currency=' + base.toUpperCase()
          + '&location=' + window.location.href;
      }
    
      function getMoversUrl(limit, base) {
        return 'https://http-api.livecoinwatch.com/coins/movers?range=delta.day&rank=200'
          + '&limit=' + limit
          + '&currency=' + base.toUpperCase()
          + '&location=' + window.location.href;
      }
    
      function getImgUrl(coin) {
        return 'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/' + coin.toLowerCase() + '.png';
      }
    
      function getCoinUrl(name, code) {
        return 'https://www.livecoinwatch.com/price/' + name + '-' + code.toUpperCase();
      }
    
      function fetch(url, cb) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              cb(JSON.parse(xmlhttp.responseText))
            } else {
              cb(null);
            }
          }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
      }
    
      function getDelta(value, period) {
        if (period === 'h') return value.hour;
        if (period === 'w') return value.week;
        if (period === 'm') return value.month;
        return value.day;
      }
    
      function getPeriodLabel(period) {
        return (PERIODS[period] || PERIODS[0]).l;
      }
    
      function getPeriodTime(period) {
        return (PERIODS[period] || PERIODS[0]).t;
      }
    
      function formatPrice(value, base, digits) {
        if (digits && Number.isFinite(Number.parseInt(digits))) {
          let frontDigits = ('' + value).split('.')[0].length;
          let requestedDigits = Math.min(digits, 9);
          let fixedDigits = Math.max(requestedDigits - frontDigits, 0);
          return formatUnit(value.toFixed(fixedDigits), base);
        }
        let val = value < 1 ? value.toFixed(5) : value.toPrecision(6);
        return formatUnit(val, base);
      }
    
      function formatDelta(e, data, arrows, dark) {
        e.innerHTML = (100 * (data - 1)).toFixed(Math.abs(data) >= 2 ? 0 : 1) + '%';
        let style = e.getAttribute('style');
        let red = dark ? redDark : redLight;
        let green = dark ? greenDark : redDark;
        let color = e.innerHTML.startsWith('-') ? red : green;
        e.setAttribute('style', style + ';' + 'color: ' + color);
        if (arrows)
          e.innerHTML = (e.innerHTML.startsWith('-') ? '↓ ' : '↑ ') + e.innerHTML.replace('-', '');
        else
          e.innerHTML = (e.innerHTML.startsWith('-') ? '' : '+') + e.innerHTML;
      }
    
      function formatDeltaInline(e, data, dark) {
        formatDelta(e, data, false, dark);
        // e.innerHTML = '(' + e.innerHTML + ')';
      }
    
      function formatAbr(value) {
        const B = 1000000000;
        const M = 1000000;
        if (value >= B) return (value / B).toPrecision(4) + " B";
        if (value >= M) return (value / M).toPrecision(4) + " M";
        return (+value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    
      function formatDateAndTime(value) {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const date = (new Date(value));
        return months[date.getMonth()]
          + ' ' + date.getDate() + ', '
          + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':'
          + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      }
    
      function formatDate(value) {
        const parts = formatDateAndTime(value).split(' ');
        return parts[0] + ' ' + parts[1];
      }
    
      function formatUnit(value, base) {
        if (currencySymbols[base.toUpperCase()]) {
          return currencySymbols[base.toUpperCase()] + ' ' + value;
        }
        return value + ' ' + base.toUpperCase();
      }
    
      function parseCode(code) { return code.replace(/^_*/, ''); }
    
      function editColor(color, percent) {
        let num = parseInt(color.replace(/^#/, ''), 16);
            let amt = Math.round(2.55 * percent);
            let R = (num >> 16) + amt;
            let B = (num >> 8 & 0x00FF) + amt;
            let G = (num & 0x0000FF) + amt;
            return '#' + (0x1000000
          + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000
          + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100
          + (G < 255 ? G < 1 ? 0 : G : 255)
        ).toString(16).slice(1);
      }
    
      function p(v) { return 'padding:' + v + 'px'; }
      function pt(v) { return 'padding-top:' + v + 'px'; }
      function pr(v) { return 'padding-right:' + v + 'px'; }
      function pb(v) { return 'padding-bottom:' + v + 'px'; }
      function pl(v) { return 'padding-left:' + v + 'px'; }
    
      function m(v) { return 'margin:' + v + 'px'; }
      function mt(v) { return 'margin-top:' + v + 'px'; }
      function mr(v) { return 'margin-right:' + v + 'px'; }
      function mb(v) { return 'margin-bottom:' + v + 'px'; }
      function ml(v) { return 'margin-left:' + v + 'px'; }
    
      function rt(v) { return 'top:' + v + 'px'; }
      function rl(v) { return 'left:' + v + 'px'; }
    
      function wpx(v) { return 'width: ' + v + 'px'; }
      function wpc(v) { return 'width: ' + v + 'px'; }
    
      function bg(v) { return 'background-color: ' + v; }
    
      function an(v) { return 'animation: scroll ' + v + 's linear infinite'; }
      function ad(v) { return 'animation-delay: -' + v + 's'; }
    
      function css() {
        return s([
          'animation : none',
          'animation-delay : 0',
          'animation-direction : normal',
          'animation-duration : 0',
          'animation-fill-mode : none',
          'animation-iteration-count : 1',
          'animation-name : none',
          'animation-play-state : running',
          'animation-timing-function : ease',
          'backface-visibility : visible',
          'background : 0',
          'background-attachment : scroll',
          'background-clip : border-box',
          'background-color : transparent',
          'background-image : none',
          'background-origin : padding-box',
          'background-position : 0 0',
          'background-position-x : 0',
          'background-position-y : 0',
          'background-repeat : repeat',
          'background-size : auto auto',
          'border : 0',
          'border-style : none',
          'border-width : medium',
          'border-color : inherit',
          'border-bottom : 0',
          'border-bottom-color : inherit',
          'border-bottom-left-radius : 0',
          'border-bottom-right-radius : 0',
          'border-bottom-style : none',
          'border-bottom-width : medium',
          'border-collapse : separate',
          'border-image : none',
          'border-left : 0',
          'border-left-color : inherit',
          'border-left-style : none',
          'border-left-width : medium',
          'border-radius : 0',
          'border-right : 0',
          'border-right-color : inherit',
          'border-right-style : none',
          'border-right-width : medium',
          'border-spacing : 0',
          'border-top : 0',
          'border-top-color : inherit',
          'border-top-left-radius : 0',
          'border-top-right-radius : 0',
          'border-top-style : none',
          'border-top-width : medium',
          'bottom : auto',
          'box-shadow : none',
          'box-sizing : content-box',
          'caption-side : top',
          'clear : none',
          'clip : auto',
          'color : inherit',
          'columns : auto',
          'column-count : auto',
          'column-fill : balance',
          'column-gap : normal',
          'column-rule : medium none currentColor',
          'column-rule-color : currentColor',
          'column-rule-style : none',
          'column-rule-width : none',
          'column-span : 1',
          'column-width : auto',
          'content : normal',
          'counter-increment : none',
          'counter-reset : none',
          'cursor : auto',
          'direction : ltr',
          'empty-cells : show',
          'float : none',
          'font : normal',
          'font-family : inherit',
          'font-size : medium',
          'font-style : normal',
          'font-variant : normal',
          'font-weight : normal',
          'height : auto',
          'hyphens : none',
          'left : auto',
          'letter-spacing : normal',
          'line-height : normal',
          'list-style : none',
          'list-style-image : none',
          'list-style-position : outside',
          'list-style-type : disc',
          'margin : 0',
          'margin-bottom : 0',
          'margin-left : 0',
          'margin-right : 0',
          'margin-top : 0',
          'max-height : none',
          'max-width : none',
          'min-height : 0',
          'min-width : 0',
          'opacity : 1',
          'orphans : 0',
          'outline : 0',
          'outline-color : invert',
          'outline-style : none',
          'outline-width : medium',
          'overflow : visible',
          'overflow-x : visible',
          'overflow-y : visible',
          'padding : 0',
          'padding-bottom : 0',
          'padding-left : 0',
          'padding-right : 0',
          'padding-top : 0',
          'page-break-after : auto',
          'page-break-before : auto',
          'page-break-inside : auto',
          'perspective : none',
          'perspective-origin : 50% 50%',
          'position : static',
          'right : auto',
          'tab-size : 8',
          'table-layout : auto',
          'text-align : inherit',
          'text-align-last : auto',
          'text-decoration : none',
          'text-decoration-color : inherit',
          'text-decoration-line : none',
          'text-decoration-style : solid',
          'text-indent : 0',
          'text-shadow : none',
          'text-transform : none',
          'top : auto',
          'transform : none',
          'transform-style : flat',
          'transition : none',
          'transition-delay : 0s',
          'transition-duration : 0s',
          'transition-property : none',
          'transition-timing-function : ease',
          'unicode-bidi : normal',
          'vertical-align : baseline',
          'visibility : visible',
          'white-space : normal',
          'widows : 0',
          'width : auto',
          'word-spacing : normal',
          'z-index : auto'
        ]);
      }
    
      function getSmallLogo(color) {
          return '<svg width=32 height=20 viewBox=""><path fill-rule="evenodd" clip-rule="evenodd" fill="' + color + '" d="M25 3c-.9-.9-1.9-1.6-3.1-2.1-1.2-.5-2.6-.8-4-.8-1.5 0-2.8.3-4 .8-1.2.5-2.3 1.2-3.2 2.1-.9.9-1.6 2-2.1 3.2-.5 1.2-.7 2.5-.7 3.8 0 1.3.2 2.6.7 3.8.5 1.2 1.1 2.2 2 3l2.8-5.1 2.8 2.8 3.1-7.4-1.3-.6 1.8-1.3 1.8-1.3.3 2.2.3 2.2-1.3-.6-4 9.5-3-2.9-1.9 3.6c.6.5 1.3.8 2 1.1 1.2.5 2.6.8 4 .8 1.5 0 2.8-.3 4-.8 2.4-1 4.3-2.9 5.2-5.3.5-1.2.7-2.5.7-3.8 0-1.3-.2-2.6-.7-3.8-.7-1.2-1.4-2.2-2.2-3.1z"></path></svg>';
      }
    
      function getLargeLogo(color) {
        return '<svg viewBox="-64 -10 410.55 50"><path fill-rule="evenodd" clip-rule="evenodd" fill="#4BC1BE" d="M116.9 3c-.9-.9-1.9-1.6-3.1-2.1-1.2-.5-2.6-.8-4-.8-1.5 0-2.8.3-4 .8-1.2.5-2.3 1.2-3.2 2.1-.9.9-1.6 2-2.1 3.2-.5 1.2-.7 2.5-.7 3.8 0 1.3.2 2.6.7 3.8.5 1.2 1.1 2.2 2 3l2.8-5.1 2.8 2.8 3.1-7.4-1.3-.6 1.8-1.3 1.8-1.3.3 2.2.3 2.2-1.3-.6-4 9.5-3-2.9-1.9 3.6c.6.5 1.3.8 2 1.1 1.2.5 2.6.8 4 .8 1.5 0 2.8-.3 4-.8 2.4-1 4.3-2.9 5.2-5.3.5-1.2.7-2.5.7-3.8 0-1.3-.2-2.6-.7-3.8-.7-1.2-1.4-2.2-2.2-3.1z"></path><path fill="' + color + '" d="M0 19.7h13.6v-3.1H3.4V.3H0v19.4zM18.7.3v19.3h3.4V.3h-3.4zm18 14.9L30.8.3H27l8 19.5h3L46 .3h-3.7l-5.6 14.9zM65.2.3H50.9v19.3h14.5v-3H54.3v-5.2H64v-3h-9.7v-5h10.9V.3zM149 13.7L138.6.3h-3.1v19.3h3.3V5.9l10.7 13.8h2.8V.3H149v13.4zm-53.1 2.9l-2.2-2.2c-.8.8-1.7 1.4-2.5 1.8-.8.5-1.9.7-3 .7-.9 0-1.8-.2-2.6-.5-.8-.4-1.5-.9-2-1.5-.6-.6-1-1.4-1.3-2.2-.3-.8-.5-1.7-.5-2.7 0-1 .2-1.9.5-2.7s.8-1.6 1.3-2.2c.6-.6 1.2-1.1 2-1.5.8-.4 1.6-.5 2.6-.5 1.1 0 2.1.2 3 .7.9.4 1.7 1 2.5 1.7L95.8 3c-.5-.4-.9-.8-1.5-1.2-.5-.4-1.1-.7-1.7-1-.6-.3-1.3-.5-2-.6-.7-.1-1.5-.2-2.4-.2-1.5 0-2.8.3-4 .8C83 1.3 81.9 2 81 2.9c-.9.9-1.6 2-2.1 3.2-.5 1.2-.7 2.5-.7 3.9s.2 2.7.7 3.9c.5 1.2 1.2 2.3 2.1 3.2.9.9 1.9 1.6 3.1 2.1 1.2.5 2.5.8 3.9.8.9 0 1.7-.1 2.5-.2.7-.2 1.4-.4 2.1-.7.6-.3 1.2-.7 1.8-1.1.5-.4 1-.9 1.5-1.4zM125.5.3v19.3h3.4V.3h-3.4zm48.3 14.4L169.2.4h-3.7l6.7 19.5h2.9l4.9-14 4.8 13.9h2.9L194.4.3h-3.6l-4.6 14.3L181.4.2h-2.9l-4.7 14.5zm33-14.5h-3.1l-8.5 19.5h3.5l2-4.7h9.1l2 4.7h3.6L206.8.2zm1.7 11.8h-6.7l3.3-7.7 3.4 7.7zm17.3-8.5h6.1V.3h-15.7v3.1h6.1v16.2h3.4V3.5h.1zm26.9 13.1l-2.2-2.2c-.8.8-1.7 1.4-2.5 1.8-.8.5-1.9.7-3 .7-.9 0-1.8-.2-2.6-.5-.8-.4-1.5-.9-2-1.5-.6-.6-1-1.4-1.3-2.2-.3-.8-.5-1.7-.5-2.7 0-1 .2-1.9.5-2.7.3-.8.8-1.6 1.3-2.2.6-.6 1.2-1.1 2-1.5.8-.4 1.6-.5 2.6-.5 1.1 0 2.1.2 3 .7.9.4 1.7 1 2.5 1.7l2.2-2.5c-.5-.4-.9-.8-1.5-1.2-.5-.4-1.1-.7-1.7-1-.6-.3-1.3-.5-2-.6-.8-.1-1.6-.2-2.5-.2-1.5 0-2.8.3-4 .8-1.2.5-2.3 1.2-3.1 2.2-.9.9-1.6 2-2.1 3.2-.5 1.2-.7 2.5-.7 3.9s.2 2.7.7 3.9c.5 1.2 1.2 2.3 2.1 3.2.9.9 1.9 1.6 3.1 2.1 1.2.5 2.5.8 3.9.8.9 0 1.7-.1 2.5-.2.7-.2 1.4-.4 2.1-.7.6-.3 1.2-.7 1.8-1.1.4-.5.9-1 1.4-1.5zm17.6-5.1v8.1h3.4V.3h-3.4v8h-9.2v-8h-3.4v19.3h3.4v-8.1h9.2z"></path></svg>';
      }
    
    // } // spa
    
    })(); // mpa
    
    // export { load }; // spa
    
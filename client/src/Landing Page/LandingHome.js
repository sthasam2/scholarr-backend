import React from "react";

const LandingHome = () => {
  return (
    <>
      <main class="main">
        {backgroundSVG}

        <section class="first">
          <div class="hero">
            <h1 class="heading">Scholarr heading text</h1>
            <h1 class="sub-heading">Scholarr sub-heading</h1>
            <button class="join-now">Join Us</button>
          </div>
          <div class="img-container"></div>
        </section>

        <section class="second">
          <div class="img-container"></div>
          <div class="hero hero-second">
            <h1 class="heading">Scholarr heading text</h1>
            <h1 class="sub-heading">Scholarr sub-heading</h1>
            <button class="join-now">Join Us</button>
          </div>
        </section>
        <section class="features">
          <div class="feature-card one">
            <div class="feature-card-img-container"></div>
            <h3 class="feature-title">Feature 1</h3>
          </div>
          <div class="feature-card two">
            <div class="feature-card-img-container"></div>
            <h3 class="feature-title">Feature 2</h3>
          </div>
          <div class="feature-card three">
            <div class="feature-card-img-container"></div>
            <h3 class="feature-title">Feature 3</h3>
          </div>
          <div class="feature-text">
            <h1 class="feature-heading">OUR FEATURES</h1>
            <h3 class="feature-description">
              Find out more about what we are capable of.
            </h3>
          </div>
        </section>
      </main>

      <footer class="footer"></footer>
    </>
  );
};

export default LandingHome;

const backgroundSVG = (
  <svg
    width="100%"
    className="svg-backdrop"
    viewBox="0 0 1920 3800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle opacity="0.1" cx="522" cy="1484" r="406" fill="#FF0000" />
    <circle opacity="0.1" cx="1768" cy="1926" r="167" fill="#FF9900" />
    <path
      d="M0 0H1301.82L1312.4 782.285C1312.72 806.328 1292.38 825.488 1268.4 823.729L0 730.699V0Z"
      fill="#33A3B8"
    />
    <path d="M0 2215.5L1920 1883.5V3540H0V2215.5Z" fill="#33A3B8" />
    <path
      d="M1517.68 729.572H1517.68C1553.83 729.572 1588.51 743.947 1614.07 769.535C1639.64 795.124 1654 829.829 1654 866.016V868.128H1381.36V866.016C1381.36 848.098 1384.88 830.355 1391.73 813.801C1398.58 797.247 1408.63 782.205 1421.28 769.535C1433.94 756.865 1448.97 746.815 1465.51 739.958C1482.05 733.101 1499.78 729.572 1517.68 729.572V729.572Z"
      fill="#004754"
    />
    <path
      d="M1269.46 492.002H1226.67V533.475H1269.46V492.002Z"
      fill="url(#paint0_linear)"
    />
    <path d="M1268.73 492.716H1227.4V532.761H1268.73V492.716Z" fill="#6EEED7" />
    <path
      d="M1327.91 527.753H1285.11V569.226H1327.91V527.753Z"
      fill="url(#paint1_linear)"
    />
    <path
      d="M1327.17 528.467H1285.85V568.512H1327.17V528.467Z"
      fill="#2E2B55"
    />
    <path
      d="M1392.85 482.252H1350.06V523.725H1392.85V482.252Z"
      fill="url(#paint2_linear)"
    />
    <path d="M1392.12 482.966H1350.79V523.01H1392.12V482.966Z" fill="#6EEED7" />
    <path
      d="M1327.01 414.181H1284.21V455.654H1327.01V414.181Z"
      fill="url(#paint3_linear)"
    />
    <path
      d="M1326.27 414.895H1284.95V454.939H1326.27V414.895Z"
      fill="#6ED7EE"
    />
    <path
      d="M1262.25 414H1219.45V455.473H1262.25V414Z"
      fill="url(#paint4_linear)"
    />
    <path
      d="M1261.51 414.714H1220.19V454.759H1261.51V414.714Z"
      fill="#2E2B55"
    />
    <path
      d="M1203.8 449.751H1161V491.224H1203.8V449.751Z"
      fill="url(#paint5_linear)"
    />
    <path d="M1203.06 450.465H1161.74V490.51H1203.06V450.465Z" fill="#6ED7EE" />
    <path
      d="M1585.1 567.364C1584.23 563.765 1582.56 560.415 1581.36 556.91C1579.69 551.841 1578.84 546.541 1578.82 541.205C1578.81 532.538 1580.34 523.691 1581.73 515.09C1582.89 507.932 1583.88 500.498 1583.76 493.237C1583.75 485.678 1582.59 478.28 1579.21 471.552C1575.47 464.12 1568.47 457.753 1560.18 457.195C1552.3 456.665 1545.02 461.299 1537.22 462.54C1529.53 463.764 1521.67 461.641 1513.9 462.212C1506.49 462.778 1499.47 465.757 1493.91 470.694C1489.64 474.504 1486.26 479.753 1486.2 485.476C1486.19 485.69 1486.21 485.889 1486.22 486.097C1486.21 486.234 1486.2 486.37 1486.2 486.508C1486.1 495.284 1492.75 498.429 1500.41 499.733C1499.8 503.799 1500 507.946 1501.01 511.932C1502.01 515.919 1503.8 519.665 1506.27 522.953C1508.73 526.241 1511.83 529.004 1515.37 531.081C1518.92 533.158 1522.84 534.508 1526.91 535.052C1527.29 535.721 1527.65 536.406 1528 537.108C1528.08 538.189 1528.14 539.272 1528.15 540.359C1528.04 546.256 1526.77 552.073 1524.41 557.478C1522.84 558.471 1521.16 559.264 1519.4 559.839L1499.81 582.543C1497.83 584.405 1496.09 586.512 1494.64 588.812C1493.98 589.179 1493.33 589.536 1492.67 589.885C1493.04 589.984 1493.42 590.084 1493.8 590.183C1493.77 590.239 1493.74 590.297 1493.71 590.353C1493.36 590.542 1493.01 590.734 1492.67 590.917L1493.3 591.083C1491.07 595.11 1489.94 599.651 1490.01 604.252C1489.98 608.564 1491.04 612.815 1493.11 616.599C1494.44 619.208 1495.6 621.906 1496.57 624.673L1490.01 635.176L1467.86 668.067L1450.83 671.296C1447.02 670.831 1443.16 670.829 1439.35 671.29L1442.86 664.659C1442.96 664.459 1443.02 664.243 1443.03 664.021C1443.05 663.8 1443.02 663.578 1442.95 663.368C1442.87 663.158 1442.76 662.964 1442.62 662.797C1442.47 662.631 1442.29 662.495 1442.09 662.397C1441.89 662.299 1441.68 662.242 1441.45 662.228C1441.23 662.214 1441.01 662.244 1440.8 662.315C1440.59 662.387 1440.4 662.5 1440.23 662.647C1440.07 662.793 1439.93 662.971 1439.83 663.171L1435.15 672.016C1429.84 673.223 1424.28 675.694 1420.41 680.584C1416.21 685.895 1420.45 687.693 1426.67 688.016L1426.02 689.237C1425.88 689.527 1425.82 689.851 1425.86 690.171C1425.9 690.491 1426.03 690.794 1426.23 691.043C1425.43 691.262 1424.58 691.511 1423.7 691.79H1409.53V698.506C1405.47 701.368 1401.98 705.083 1400.21 709.865C1388.9 719.46 1387.94 737.86 1387.94 737.86L1351.85 843.641C1351.85 843.641 1351.06 844.817 1349.88 846.723C1339.97 853.017 1320.21 877.775 1325.39 888V888L1347.16 876.948C1347.51 877.098 1347.72 877.181 1347.72 877.181L1349.31 875.855L1393.15 853.591L1383.41 833.924L1382.07 834.428C1381.67 832.452 1381.83 830.625 1383.3 829.709C1385.69 828.213 1400.91 799.126 1413.28 774.951C1417.6 787.875 1426.61 817.93 1422.38 832.535L1420.77 833.74C1413.12 840.921 1399.57 872.57 1407.76 881.316V881.316L1429.76 860.675L1446.71 845.189L1447.03 844.469L1463.19 829.305L1448.35 813.15L1446.03 814.88C1444.69 810.912 1441.91 801.927 1443.1 798.749C1444.32 795.5 1447.44 763.559 1442.56 741.645L1446.06 741.412C1458.19 757.262 1472.85 771.363 1477.12 772.432C1477.54 772.533 1477.98 772.548 1478.41 772.478C1486.71 773.813 1501.87 740.44 1501.87 740.44H1544.14C1581.36 735.119 1575.2 705.163 1567.72 686.962C1567.95 687.07 1568.17 687.18 1568.37 687.292C1568.37 687.292 1568.29 686.891 1568.14 686.14C1568.22 686.18 1568.3 686.219 1568.37 686.26C1566.13 674.812 1564.97 663.176 1564.92 651.509C1564.9 643.386 1565.63 635.279 1567.11 627.293C1570.04 632.448 1574.59 636.802 1580.36 637.524C1583.48 618.808 1585.33 599.902 1585.91 580.935C1585.95 579.595 1585.98 578.25 1585.98 576.907C1586.08 573.702 1585.79 570.496 1585.1 567.364V567.364ZM1476.09 684.914L1478.3 682.414C1488.46 681.017 1498.88 679.387 1505.82 677.786C1503.42 681.024 1500.36 683.708 1496.83 685.66C1491.55 685.333 1484.17 684.981 1476.09 684.914ZM1502.19 655.296L1499.81 662.008L1495.56 662.812L1502.19 655.296ZM1430.47 688.053C1434.42 687.909 1438.36 687.547 1442.27 686.969C1442.19 687.033 1442.11 687.099 1442.04 687.165C1438.86 687.718 1435.74 688.537 1432.7 689.614L1432.7 689.614C1432.7 689.614 1431.39 689.803 1429.29 690.278L1430.47 688.053Z"
      fill="url(#paint6_linear)"
    />
    <path
      d="M1427.89 690.771C1427.7 690.677 1427.53 690.546 1427.38 690.386C1427.24 690.226 1427.14 690.04 1427.07 689.838C1427 689.636 1426.97 689.422 1426.98 689.209C1427 688.996 1427.05 688.788 1427.15 688.596L1440.43 663.533C1440.52 663.341 1440.65 663.17 1440.81 663.029C1440.97 662.888 1441.16 662.78 1441.36 662.71C1441.56 662.641 1441.77 662.613 1441.99 662.626C1442.2 662.64 1442.41 662.695 1442.6 662.789V662.789C1442.79 662.883 1442.96 663.014 1443.1 663.174C1443.24 663.334 1443.35 663.52 1443.42 663.722C1443.49 663.924 1443.52 664.138 1443.5 664.351C1443.49 664.564 1443.44 664.772 1443.34 664.963L1430.06 690.027C1429.97 690.219 1429.84 690.39 1429.68 690.531C1429.52 690.672 1429.33 690.78 1429.13 690.849C1428.93 690.918 1428.71 690.947 1428.5 690.934C1428.29 690.92 1428.08 690.865 1427.89 690.771Z"
      fill="#4D8AF0"
    />
    <path
      d="M1433.57 688.958C1433.57 688.958 1397.47 694.168 1401.43 718.976L1412.83 765.118C1412.83 765.118 1429.69 810.268 1423.24 827.634C1423.24 827.634 1416.8 855.418 1410.35 854.426C1403.91 853.434 1424.23 859.387 1424.23 859.387L1447.04 838.549L1453.98 823.168C1453.98 823.168 1455.96 818.703 1447.04 811.26C1447.04 811.26 1442.08 797.864 1443.57 793.895C1445.05 789.926 1449.51 741.399 1437.37 724.73L1433.57 688.958Z"
      fill="#BE7C5E"
    />
    <path
      opacity="0.1"
      d="M1433.57 688.958C1433.57 688.958 1397.47 694.168 1401.43 718.976L1412.83 765.118C1412.83 765.118 1429.69 810.268 1423.24 827.634C1423.24 827.634 1416.8 855.418 1410.35 854.426C1403.91 853.434 1424.23 859.387 1424.23 859.387L1447.04 838.549L1453.98 823.168C1453.98 823.168 1455.96 818.703 1447.04 811.26C1447.04 811.26 1442.08 797.864 1443.57 793.895C1445.05 789.926 1449.51 741.399 1437.37 724.73L1433.57 688.958Z"
      fill="black"
    />
    <path
      d="M1409.59 873.286L1462.89 823.276L1448.61 807.743L1422.1 827.54C1414.74 834.445 1401.72 864.877 1409.59 873.286L1409.59 873.286Z"
      fill="#F5F5F5"
    />
    <path
      d="M1503.05 685.734C1503.05 685.734 1449.51 680.772 1430.68 690.199C1430.68 690.199 1429.19 698.137 1437.12 707.564C1445.05 716.991 1503.05 685.734 1503.05 685.734Z"
      fill="#333333"
    />
    <path
      opacity="0.3"
      d="M1503.05 685.734C1503.05 685.734 1449.51 680.772 1430.68 690.199C1430.68 690.199 1429.19 698.137 1437.12 707.564C1445.05 716.991 1503.05 685.734 1503.05 685.734Z"
      fill="black"
    />
    <path
      d="M1462.83 691.051H1411.29V698.255H1462.83V691.051Z"
      fill="#E0E0E0"
    />
    <path
      d="M1444.06 700.618C1444.06 700.618 1415.31 698.633 1403.41 707.564C1391.52 716.495 1390.53 735.349 1390.53 735.349L1355.83 837.06C1355.83 837.06 1345.04 853.22 1343.43 862.86C1342.94 865.837 1351.86 869.31 1351.86 869.31L1382.1 844.006L1388.05 835.572C1388.05 835.572 1382.1 826.145 1386.06 823.664C1390.03 821.183 1430.68 739.814 1430.68 739.814L1482.73 736.341L1444.06 700.618Z"
      fill="#BE7C5E"
    />
    <path
      opacity="0.1"
      d="M1555.6 672.833C1555.6 672.833 1591.78 730.387 1539.73 737.83H1499.09C1499.09 737.83 1484.21 770.576 1476.28 768.591C1468.35 766.607 1423.24 717.983 1430.18 700.618L1494.13 685.733C1494.13 685.733 1506.03 680.276 1507.02 669.36L1555.6 672.833Z"
      fill="black"
    />
    <path
      d="M1556.59 672.833C1556.59 672.833 1592.78 730.387 1540.73 737.83H1500.08C1500.08 737.83 1485.21 770.576 1477.27 768.591C1469.34 766.607 1424.23 717.983 1431.17 700.618L1495.12 685.733C1495.12 685.733 1507.02 680.276 1508.01 669.36L1556.59 672.833Z"
      fill="#333333"
    />
    <path
      d="M1330.39 879.713L1395.54 846.628L1386.18 827.718L1355.18 839.297C1346.19 843.865 1325.18 869.434 1330.39 879.713V879.713Z"
      fill="#F5F5F5"
    />
    <path
      d="M1501.07 616.768L1488.68 636.614L1458.93 680.772C1458.93 680.772 1434.64 681.764 1437.62 701.114C1440.59 720.464 1469.34 691.191 1469.34 691.191L1517.43 636.614L1501.07 616.768Z"
      fill="#BE7C5E"
    />
    <path
      opacity="0.1"
      d="M1501.07 616.768L1488.68 636.614L1458.93 680.772C1458.93 680.772 1434.64 681.764 1437.62 701.114C1440.59 720.464 1469.34 691.191 1469.34 691.191L1517.43 636.614L1501.07 616.768Z"
      fill="black"
    />
    <path
      d="M1528.09 540.609C1544.51 540.609 1557.83 527.281 1557.83 510.84C1557.83 494.398 1544.51 481.07 1528.09 481.07C1511.66 481.07 1498.34 494.398 1498.34 510.84C1498.34 527.281 1511.66 540.609 1528.09 540.609Z"
      fill="#BE7C5E"
    />
    <path
      d="M1513.46 526.468C1513.46 526.468 1539.73 550.284 1524.86 574.595C1509.99 598.907 1561.54 558.222 1561.54 558.222C1561.54 558.222 1543.7 528.453 1547.66 510.591L1513.46 526.468Z"
      fill="#BE7C5E"
    />
    <path
      opacity="0.1"
      d="M1533.29 551.276C1533.29 551.276 1526.35 562.191 1516.93 565.168L1498.09 586.999C1498.09 586.999 1482.23 600.891 1491.65 618.753C1501.07 636.614 1506.52 680.772 1506.52 680.772C1506.52 680.772 1553.12 680.772 1564.02 686.726C1564.02 686.726 1554.61 643.56 1567.49 613.295C1580.38 583.029 1557.58 541.353 1557.58 541.353L1533.29 551.276Z"
      fill="black"
    />
    <path
      d="M1533.29 550.283C1533.29 550.283 1526.35 561.199 1516.93 564.176L1498.09 586.007C1498.09 586.007 1482.23 599.899 1491.65 617.76C1501.07 635.622 1506.52 679.78 1506.52 679.78C1506.52 679.78 1553.12 679.78 1564.02 685.733C1564.02 685.733 1554.61 642.568 1567.49 612.303C1580.38 582.037 1557.58 540.36 1557.58 540.36L1533.29 550.283Z"
      fill="#F55F44"
    />
    <path
      d="M1552.62 599.899C1552.62 599.899 1518.42 670.849 1510.98 675.314C1503.55 679.78 1447.04 685.733 1447.04 685.733C1447.04 685.733 1412.34 692.183 1421.76 680.276C1431.17 668.368 1451 671.345 1451 671.345L1498.09 662.414L1525.36 585.51L1552.62 599.899Z"
      fill="#BE7C5E"
    />
    <path
      opacity="0.1"
      d="M1537.25 566.161C1537.25 566.161 1509.99 582.534 1515.44 597.418C1515.44 597.418 1546.67 592.953 1557.58 613.791C1557.58 613.791 1574.93 594.441 1561.54 573.603C1561.54 573.603 1554.11 560.207 1537.25 566.161Z"
      fill="black"
    />
    <path
      d="M1537.25 565.168C1537.25 565.168 1509.99 581.542 1515.44 596.426C1515.44 596.426 1546.67 591.961 1557.58 612.799C1557.58 612.799 1574.93 593.449 1561.54 572.611C1561.54 572.611 1554.11 559.215 1537.25 565.168Z"
      fill="#F55F44"
    />
    <path
      opacity="0.1"
      d="M1514.65 507.755C1515.09 507.735 1515.53 507.803 1515.95 507.957C1516.36 508.111 1516.74 508.348 1517.07 508.652C1517.39 508.956 1517.65 509.322 1517.82 509.729C1518 510.135 1518.1 510.573 1518.1 511.017C1519.34 515.764 1520.58 520.511 1521.82 525.259C1523.59 532.03 1525.37 538.892 1525.36 545.89C1525.35 566.588 1509.54 584.441 1491.23 594.058L1509.97 598.985C1511.8 599.598 1513.73 599.839 1515.66 599.692C1517.25 599.387 1518.76 598.763 1520.1 597.858C1528.07 592.973 1533.78 585.015 1537.56 576.461C1541.33 567.907 1543.34 558.697 1545.33 549.56C1551.51 560.539 1555.31 572.7 1556.48 585.248C1557.74 598.876 1555.95 613.177 1561.22 625.808C1563.82 632.064 1568.82 638.031 1575.54 638.873C1578.54 620.876 1580.33 602.697 1580.89 584.46C1581.01 580.422 1581.07 576.329 1580.11 572.404C1579.27 568.943 1577.66 565.722 1576.51 562.352C1572.02 549.214 1574.66 534.855 1576.87 521.148C1579.08 507.44 1580.68 492.68 1574.44 480.277C1570.85 473.131 1564.12 467.009 1556.14 466.473C1548.56 465.963 1541.57 470.418 1534.07 471.612C1526.67 472.789 1519.11 470.748 1511.64 471.297C1504.52 471.841 1497.77 474.706 1492.42 479.452C1488.32 483.116 1485.07 488.163 1485.01 493.666C1484.84 508.476 1504.66 506.618 1514.65 507.755Z"
      fill="#333333"
    />
    <path
      d="M1514.65 506.763C1515.09 506.742 1515.53 506.811 1515.95 506.965C1516.36 507.119 1516.74 507.355 1517.07 507.66C1517.39 507.964 1517.65 508.33 1517.82 508.737C1518 509.143 1518.1 509.581 1518.1 510.024C1519.34 514.772 1520.58 519.519 1521.82 524.267C1523.59 531.038 1525.37 537.9 1525.36 544.898C1525.35 565.596 1509.54 583.449 1491.23 593.066L1509.97 597.993C1511.8 598.606 1513.73 598.847 1515.66 598.7C1517.25 598.395 1518.76 597.771 1520.1 596.866C1528.07 591.981 1533.78 584.022 1537.56 575.469C1541.33 566.915 1543.34 557.705 1545.33 548.568C1551.51 559.547 1555.31 571.708 1556.48 584.256C1557.74 597.884 1555.95 612.184 1561.22 624.816C1563.82 631.072 1568.82 637.039 1575.54 637.881C1578.54 619.884 1580.33 601.705 1580.89 583.468C1581.01 579.43 1581.07 575.337 1580.11 571.412C1579.27 567.951 1577.66 564.73 1576.51 561.359C1572.02 548.221 1574.66 533.863 1576.87 520.156C1579.08 506.448 1580.68 491.687 1574.44 479.285C1570.85 472.139 1564.12 466.017 1556.14 465.481C1548.56 464.971 1541.57 469.426 1534.07 470.62C1526.67 471.796 1519.11 469.755 1511.64 470.305C1504.52 470.849 1497.77 473.713 1492.42 478.46C1488.32 482.124 1485.07 487.171 1485.01 492.674C1484.84 507.483 1504.66 505.626 1514.65 506.763Z"
      fill="#333333"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 3348L27.2 3373.11C52.8 3398.22 107.2 3414.96 160 3414.96C212.8 3414.96 267.2 3364.74 320 3381.48C372.8 3398.22 427.2 3481.93 480 3473.56C532.8 3465.19 587.2 3364.74 640 3373.11C692.8 3381.48 729.7 3448.44 782.5 3473.56C835.3 3498.67 892.2 3428.76 945 3445.5C997.8 3462.24 1067.2 3532.15 1120 3507.04C1172.8 3481.93 1227.2 3414.96 1280 3389.85C1332.8 3364.74 1387.2 3465.19 1440 3507.04C1492.8 3548.89 1564.7 3465.49 1617.5 3465.49C1670.3 3465.49 1707.2 3548.89 1760 3532.15C1812.8 3515.41 1867.2 3465.19 1892.8 3440.07L1920 3414.96V3800H1892.8C1867.2 3800 1812.8 3800 1760 3800C1707.2 3800 1652.8 3800 1600 3800C1547.2 3800 1492.8 3800 1440 3800C1387.2 3800 1332.8 3800 1280 3800C1227.2 3800 1172.8 3800 1120 3800C1067.2 3800 1012.8 3800 960 3800C907.2 3800 852.8 3800 800 3800C747.2 3800 692.8 3800 640 3800C587.2 3800 532.8 3800 480 3800C427.2 3800 372.8 3800 320 3800C267.2 3800 212.8 3800 160 3800C107.2 3800 52.8 3800 27.2 3800H0V3348Z"
      fill="#2E2B55"
    />
    <circle opacity="0.1" cx="1851" cy="87" r="170" fill="#F20000" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1248.06"
        y1="533.475"
        x2="1248.06"
        y2="492.002"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="8662.79"
        y1="8147.61"
        x2="8662.79"
        y2="6111.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="12020.4"
        y1="5868.5"
        x2="12020.4"
        y2="3832.65"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="8616.16"
        y1="2458.9"
        x2="8616.16"
        y2="423.044"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint4_linear"
        x1="5267.82"
        y1="2449.85"
        x2="5267.82"
        y2="414"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint5_linear"
        x1="2245.93"
        y1="4240.58"
        x2="2245.93"
        y2="2204.72"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint6_linear"
        x1="172992"
        y1="315200"
        x2="172992"
        y2="95483.2"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#808080" stopOpacity="0.25" />
        <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
        <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
);

let interval;
let x,
  responseArr = [];
function showContent(link) {
  let http = createRequestObject();
  //   cont.innerHTML = loading.innerHTML;

  if (http) {
    let data = "";
    http.open("POST", "https://api.exmo.com/v1.1/ticker");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status > 199) {
        x = JSON.parse(http.responseText).BTC_USD;
        responseArr.push(x)
        let td = document.createElement("tr");
        (tdAvg = document.createElement("td")),
          (tdBuy = document.createElement("td")),
          (tdSell = document.createElement("td")),
          (tdHigh = document.createElement("td")),
          (tdLow = document.createElement("td")),
          (tdLast = document.createElement("td")),
          (tdUpdated = document.createElement("td")),
          (tdVol = document.createElement("td")),
          (tdVolCur = document.createElement("td"));
        td.append(
          tdAvg,
          tdBuy,
          tdSell,
          tdHigh,
          tdLow,
          tdLast,
          tdUpdated,
          tdVol,
          tdVolCur
        );
        document.querySelector("tbody").append(td);
        tdAvg.textContent = x.avg;
        tdBuy.textContent = x.buy_price;
        tdSell.textContent = x.sell_price;
        tdHigh.textContent = x.high;
        tdLow.textContent = x.low;
        tdLast.textContent = x.last_trade;
        tdUpdated.textContent = x.updated;
        tdVol.textContent = x.vol;
        tdVolCur.textContent = x.vol_curr;
      }
    };
    http.send(data);
  } else {
    document.location = link;
  }
}

document.querySelector("#start").addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(showContent, 1000);
});
document.querySelector("#stop").addEventListener("click", () => {
  clearInterval(interval);
});

function createRequestObject() {
  try {
    return new XMLHttpRequest();
  } catch (e) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        return null;
      }
    }
  }
}

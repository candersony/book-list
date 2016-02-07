/**
 * Created by Craig on 06/02/2016.
 */

function get(url) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = function () {
      if (request.status == 200) {
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText));
      }
    };

    request.onerror = function () {
      reject(Error("Network Error"));
    };

    request.send();
  });
}

function getJson(url) {
  return get(url)
    .then(responseText => JSON.parse(responseText))
}

export default {
  get,
  getJson
}

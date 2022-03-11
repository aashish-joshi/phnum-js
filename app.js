function loadScript(url, callback) {
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
}

function displayNumber() {
  fetch("num.json")
    .then((response) => {
      return response.json();
    })
    .then((data1) => {
      //do something
      let final_data = data1.numbers;

      fetch("https://api.sonetel.com/geo-location/ipaddress/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const iso = data.response.country_code;
          var number;
          var number_iso;

        for (let nums of final_data){
            if (iso == nums.iso){
                number = nums.e164number;
                number_iso = nums.iso;
                break;
            }
        }
        if (number === undefined){
            number = data1.default.e164number;
            number_iso = data1.default.iso;
        }
        
          const num_formatted = new libphonenumber.parsePhoneNumber(number, number_iso);
          let formattedNumText;
          if (iso.toUpperCase() === number_iso) {
            formattedNumText = num_formatted.formatNational();
            console.log("using national format");
          } else {
            formattedNumText = num_formatted.formatInternational();
            console.log("using international format");
          }

          // create & configure the <a> child element
          const num_link = document.createElement("a");
          num_link.href = num_formatted.getURI();
          const textStuff = document.createTextNode(formattedNumText);
          num_link.appendChild(textStuff);
          num_link.title = formattedNumText;

          // attach the <a> element to the display element.
          document.getElementById("sonetel-disp-num").appendChild(num_link);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
  //
}
loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.9.49/libphonenumber-js.min.js",
  displayNumber
);

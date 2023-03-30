// FARE KAYDIRMA ÇUBUĞU
var leftElement = document.querySelector('.edit');

leftElement.addEventListener('wheel', function (event) {
  var delta = event.deltaY;
  var top = leftElement.scrollTop;

  leftElement.scrollTop = top + delta;
});


var baslangicSelects = document.querySelectorAll("select[name='is-baslangic'], select[name='okul-baslangic']");
var bitisSelects = document.querySelectorAll("select[name='is-bitis'], select[name='okul-bitis']");

var startYear = 1980;
var endYear = 2031;

baslangicSelects.forEach((select) => {
  for (let year = endYear; year >= startYear; year--) {
    var option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year === 2020) {
      option.selected = true; // Varsayılan seçili yapmak için
    }
    select.appendChild(option);
  }
});

bitisSelects.forEach((select) => {
  var devamEdiyorOption = document.createElement("option");
  devamEdiyorOption.value = "Devam Ediyor";
  devamEdiyorOption.textContent = "Devam Ediyor";
  devamEdiyorOption.selected = true; // Varsayılan seçili yapmak için
  select.appendChild(devamEdiyorOption);

  for (let year = endYear; year >= startYear; year--) {
    var option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
});



ClassicEditor
  .create(document.querySelector('#hakkimda'))
  .catch(error => {
    console.error(error);
  });
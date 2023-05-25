var formElements = document.querySelectorAll("input, select, textarea");

formElements.forEach(function (formElement) {
    formElementListener(formElement);
});

var cvAlani = document.querySelector(".cv");
// Tüm cardları seç
var cvCards = cvAlani.querySelectorAll('[class*="card"]');

// Her bir card'ın içindeki tüm accordion öğelerini dolaş
cvCards.forEach(card => {
    var cardClass = card.className.split(" ").find(className => className.includes("card"));
    var cardItems = card.querySelectorAll('[id*="item"]');

    // Her bir accordion öğesi için cardListener fonksiyonunu çağır
    cardItems.forEach(item => {
        cvElementListener(item, cardClass);
    });
});



// İkonu oluştur
var icon = document.createElement('i');
icon.classList.add('bi', 'bi-trash', 'position-absolute');
icon.style.right = '60px';

// Tüm accordion-itemları seç
var accordionItems = document.querySelectorAll('.accordion-item');

// Her bir item için ikonu ekle
accordionItems.forEach(function (item) {
    var button = item.querySelector('.accordion-button');
    button.appendChild(icon.cloneNode(true));
});

function cvElementListener(cvElement, elementCardId) {
    var str = cvElement.id;
    const result = str.match(/item-(\d+)/);
    var editAlani = document.querySelector(".edit");
    var editCardİtems = editAlani.querySelector('#' + elementCardId + ' [id*="' + result[0] + '"] .accordion-body');
    if (editCardİtems !== null) {
        var cardİtemsElements = editCardİtems.querySelectorAll("*");
        var cvElements = cvElement.querySelectorAll("*");
        cardİtemsElements.forEach((itemElem) => {
            var itemElemId = itemElem.id;
            cvElements.forEach((cvElem) => {
                if (cvElem.id.includes(itemElemId)) {
                    itemElem.value = cvElem.innerText;
                };
            });
        });
    } else {
        console.log("HATA CARD İTEMS BULUNAMIYOR SONUÇ NULL");
    };
};



function formElementListener(formElement) {
    formElement.addEventListener("change", function () {
      var id = formElement.id;
      var value = formElement.value;
      var cardId = formElement.closest(".card").id;
  
      var cvArea = document.querySelector(".cv");
      var cardSection = cvArea.querySelector("." + cardId);
  
      if (cardSection) {
        var cardElements = cardSection.querySelectorAll("[id]");
        for (let i = 0; i < cardElements.length; i++) {
          if (cardElements[i].id.includes(id)) {
            var selectedElement = cardElements[i];
            selectedElement.lastChild.textContent = value;
            console.log(selectedElement.textContent);
          };
        };
      };
    });
  };

function removeCvItem(item_id, card_id) {
    var str = item_id;
    const result = str.match(/item-(\d+)/);
    console.log(result[0]);
    var cvAlani = document.querySelector(".cv");
    var removeItemCard = cvAlani.querySelector("." + card_id);
    var removeItem = removeItemCard.querySelector('[id*="' + result[0] + '"]');
    removeItem.remove();
}



const cards = document.querySelectorAll(".card");
cards.forEach((card) => {

    // Tüm ikonları seç
    var deleteIcons = card.querySelectorAll('.bi-trash');

    // Her bir ikon için tıklama olayına dinleyici ekle
    deleteIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            var accordionItem = icon.closest('.accordion-item');
            // var index = accordionItems.indexOf(accordionItem);
            var accordionItems = Array.from(card.querySelectorAll('.accordion-item'));
            // Eğer silinecek olan item son item değilse, sil
            if (!(card.id === "card-1") && !(card.id === "card-9")) {
                accordionItem.remove();
                removeCvItem(accordionItem.id, card.id)
            } else {
                // Eğer silinecek olan item son item ise, uyarı göster
                var deleteWarning = icon.closest(".accordion-button");
                deleteWarning.style.backgroundColor = "#FFA07A";
                // Uyarıyı belirli bir süre sonra kaldır
                setTimeout(function () {
                    deleteWarning.style.backgroundColor = "";
                }, 1000);
            }
        });
    });





    const addBtn = card.querySelector(".add-btn");

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            const accordion = card.querySelector(".accordion");
            // Mevcut card içindeki accordion itemları seç
            var currentAccordions = card.querySelectorAll('.accordion-item');

            // mevcut cardın başlığını al
            var cardHeader = card.querySelector(".card-header").textContent;
            // Son itemin id'sini al
            // Son accordion elemanını alın
            var accordions = card.querySelectorAll('.accordion');
            var lastAccordion = accordions[accordions.length - 1];
            // Son accordion elemanının altındaki son item'in ID'sini alın
            var lastItem = lastAccordion.querySelector('.accordion-item:last-of-type');
            var lastItemContent = lastItem.querySelector(".accordion-body");
            var lastId = lastItem ? lastItem.id : card.id + '-item-0';
            var lastNum = parseInt(lastId.split('-').pop()) || 0;
            var newId = card.id + '-item-' + (lastNum + 1);
            // console.log(lastNum)

            // Tüm elementleri seçin ve her birinin id özelliğini değiştirin
            var tempElement = document.createElement("div");
            tempElement.appendChild(lastItemContent.cloneNode(true));
            var elements = tempElement.querySelectorAll('*');
            for (var i = 0; i < elements.length; i++) {
                var oldId = elements[i].id;
                if (oldId) {
                    var sonuc = oldId.substring(0, oldId.lastIndexOf("-"));;
                    elements[i].id = sonuc + "-" + (lastNum + 1);
                }
            }


            var newAccordion = document.createElement("div")
            newAccordion.classList.add("accordion-item");
            newAccordion.setAttribute("id", newId);
            newAccordion.innerHTML = `<h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${newId}" aria-expanded="false" aria-controls="collapse-${newId}">
            ${cardHeader}   ${(lastAccordion.querySelectorAll('.accordion-item').length + 1)}
            </button>
            </h2>
            <div id="collapse-${newId}" class="accordion-collapse collapse" data-bs-parent="#${lastAccordion.id}">
            <div class="accordion-body">
            ${tempElement.innerHTML}
            </div>
            </div>`;
            accordion.appendChild(newAccordion);

            var newAccordionBody = newAccordion.querySelector(".accordion-body");
            var newAccordionElements = newAccordionBody.querySelectorAll("[id]");
            for (let i = 0; i < newAccordionElements.length; i++) {
                formElementListener(newAccordionElements[i]);
            }



            // Yeni itema da ikonu ekle
            var newAccordionButton = card.querySelector('#' + newId + ' .accordion-button');
            newAccordionButton.appendChild(icon.cloneNode(true));

            // Yeni ikona tıklama olayına dinleyici ekle
            var newIcon = newAccordionButton.querySelector('.bi-trash');
            newIcon.addEventListener('click', function () {
                var accordionItem = newIcon.closest('.accordion-item');
                var accordionItems = Array.from(card.querySelectorAll('.accordion-item'));
                // Eğer silinecek olan item son item değilse, sil
                if (!(card.id == "card-1")) {
                    accordionItem.remove();
                    var del_id = "item-" + (lastNum + 1);
                    removeCvItem(del_id, card.id);
                } else {
                    // Eğer silinecek olan item son item ise, uyarı göster
                    var deleteWarning = newIcon.closest(".accordion-button");
                    deleteWarning.style.backgroundColor = "#FFA07A";
                    // Uyarıyı belirli bir süre sonra kaldır
                    setTimeout(function () {
                        deleteWarning.style.backgroundColor = "";
                    }, 1000);
                };
            });


            var cvArea = document.querySelector(".cv");
            var cvCard = cvArea.querySelector("." + card.id);

            if (card.id == "card-2") {
                var sonBaglanti = cvCard.querySelector("li:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var newBaglanti = document.createElement("li");
                newBaglanti.classList.add("mb-3", "li-linkedin");
                var newBaglantiId = "baglantilar-item-" + number;
                newBaglanti.setAttribute("id", newBaglantiId);
                newBaglanti.innerHTML = `<a class="text-link" href="#" id="url-adres-${number}"><span class="fa-container text-center me-2">
                <i class="fab fa-linkedin-in fa-fw"></i></span>linkedin.com/in/stevedoe</a>`;
                cvCard.appendChild(newBaglanti);
                cvElementListener(newBaglanti, card.id);
            } else if (card.id == "card-3") {
                var sonBaglanti = cvCard.querySelector("article:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var isDeneyim = document.createElement("article");
                isDeneyim.classList.add("resume-timeline-item", "position-relative", "pb-5");
                var isDeneyimId = "is-deneyimi-item-" + number;
                isDeneyim.setAttribute("id", isDeneyimId);
                isDeneyim.innerHTML = `<div class="resume-timeline-item-header mb-2">
                  <div class="d-flex flex-column flex-md-row">
                    <h3 class="resume-position-title font-weight-bold mb-1" id="deneyim-is-unvan-${number}">Yeni İş Ünvanı</h3>
                    <div class="resume-company-name ms-auto"><span id="deneyim-isveren-${number}">Yeni İş Şirketi</span> - <span id="deneyim-is-sehir-${number}">Yeni İş Şehri</span></div>
                  </div>
                  <div class="resume-position-time"><span id="deneyim-is-baslangic-${number}">2020</span> - <span id="deneyim-is-bitis-${number}">Devam Ediyor</span></div>
                </div>
                <div class="resume-timeline-item-desc">
                  <p id="deneyim-is-aciklama-${number}">Yeni İş Açıklaması</p>
                </div>`;
                cvCard.appendChild(isDeneyim);
                cvElementListener(isDeneyim, card.id);
            } else if (card.id == "card-4") {
                var sonBaglanti = cvCard.querySelector("article:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var egitimBilgisi = document.createElement("article");
                egitimBilgisi.classList.add("resume-timeline-item", "position-relative", "pb-5");
                var egitimBilgisiId = "egitim-item-" + number;
                egitimBilgisi.setAttribute("id", egitimBilgisiId);
                egitimBilgisi.innerHTML = `<div class="resume-timeline-item-header mb-2">
                <div class="d-flex flex-column flex-md-row">
                  <h3 class="resume-position-title font-weight-bold mb-1" id="egitim-okul-${number}">Okul Adı</h3>&nbsp;/&nbsp;<span id="egitim-bolum-${number}">Bölüm</span>
                  <div class="resume-company-name ms-auto">
                    <span id="egitim-derece-${number}">Lisans</span> - <span id="egitim-okul-sehir-${number}">Şehir</span> 
                  </div>
                </div>
                <div class="resume-position-time" id="egitim-tarih-${number}"><span
                    id="egitim-okul-baslangic-${number}">2021</span> - <span id="egitim-okul-bitis-${number}">2025</span>
                </div>
              </div>
              <div class="resume-timeline-item-desc">
                <p id="egitim-egitim-aciklama-${number}">Eğitim Açıklaması</p>
              </div>`
              cvCard.appendChild(egitimBilgisi);
              cvElementListener(egitimBilgisi, card.id);
            } else if (card.id == "card-5") {
                var sonBaglanti = cvCard.querySelector("li:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var dilBilgi = document.createElement("li");
                dilBilgi.classList.add("mb-2");
                var dilId = "diller-item-" + number;
                dilBilgi.setAttribute("id", dilId);
                dilBilgi.innerHTML = `<span class="resume-lang-name font-weight-bold"
                id="diller-dil-${number}">Dil</span> (<small class="text-muted font-weight-normal"
                id="diller-dil-seviye-${number}">Orta seviye</small>)`;
                cvCard.appendChild(dilBilgi);
                cvElementListener(dilBilgi, card.id);
            } else if (card.id == "card-6") {
                var sonBaglanti = cvCard.querySelector("li:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var yetenekBilgi = document.createElement("li");
                yetenekBilgi.classList.add("mb-2");
                var yetenekId = "beceri-bilgileri-item-" + number;
                yetenekBilgi.setAttribute("id", yetenekId);
                yetenekBilgi.innerHTML = `<div class="resume-skill-name" id="beceriler-beceri-${number}">Yetenek/Beceri Adı</div>
                <div class="progress resume-progress">
                  <div class="progress-bar theme-progress-bar-dark" id="beceri-seviye-${number}" role="progressbar"
                    style="width: 60%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>`;
                cvCard.appendChild(yetenekBilgi);
                cvElementListener(yetenekBilgi, card.id);
            } else if (card.id == "card-7") {
                var sonBaglanti = cvCard.querySelector("li:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                var hobiBilgi = document.createElement("li");
                hobiBilgi.classList.add("mb-1");
                var hobiId = "hobiler-item-" + number;
                hobiBilgi.setAttribute("id", hobiId);
                hobiBilgi.innerHTML = `<span id="hobiler-hobi-${number}">Hobi</span>`;
                cvCard.appendChild(hobiBilgi);
                cvElementListener(hobiBilgi, card.id);
            } else if (card.id == "card-8") {
                console.log('BURASI ' + card.id + ' İD Lİ ALANDIR')
            } else {
                console.log("CARD ID HATASI")
            }

        });
    };



});





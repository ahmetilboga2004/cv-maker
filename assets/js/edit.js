var formElements = document.querySelectorAll("input, select, textarea");

formElements.forEach(function (formElement) {
    formElementListener(formElement);
});

var cvAlani = document.querySelector(".cv");
// Tüm cardları seç
var cvCards = cvAlani.querySelectorAll('[class*="card"]');

// Her bir card'ın içindeki tüm accordion öğelerini dolaş
cvCards.forEach(card => {
    console.log("CARD: " + card.id);
    var cardClass = card.className.split(" ").find(className => className.includes("card"));
    var cardItems = card.querySelectorAll('[id*="item"]');

    // Her bir accordion öğesi için cardListener fonksiyonunu çağır
    cardItems.forEach(item => {
        cvElementListener(item, cardClass);
        console.log("CARD ITEM: " + item);
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
    // console.log(result[0])
    var editAlani = document.querySelector(".edit");
    var editCardİtems = editAlani.querySelector('#'+ elementCardId + ' [id*="' + result[0] + '"] .accordion-body');
    if (editCardİtems !== null) {
        var cardİtemsElements = editCardİtems.querySelectorAll("*");
        var cvElements = cvElement.querySelectorAll("*");
        cardİtemsElements.forEach((itemElem) => {
            var itemElemId = itemElem.id;
            cvElements.forEach((cvElem) => {
                if(cvElem.id.includes(itemElemId)) {
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
        // Değişiklik yapılan form elemanının özelliklerini alın
        var id = formElement.id;
        var type = formElement.tagName;
        var value = formElement.value;
        var cardId = formElement.closest(".card").id;
        var accordionId = formElement.closest(".accordion-item").id;
        var number = accordionId.match(/\d+$/)?.[0];
        // console.log(number)

        // Konsola yazdırın
        // console.log("Değişiklik yapılan form elemanı: " + id);
        // console.log("Eleman türü: " + type);
        // console.log("Değer: " + value);
        // console.log("Card ID: " + cardId);
        // console.log("Accordion ID: " + accordionId);


        var cvArea = document.querySelector(".cv");
        var cardSection = cvArea.querySelector("." + cardId);


        if (cardSection) {
            var cardElements = cardSection.querySelectorAll("[id]");
            // for döngüsü ile tüm öğeleri döngüye sokun
            for (let i = 0; i < cardElements.length; i++) {
                if (cardElements[i].id.includes(id)) {
                    var selectedElement = cardElements[i];
                    selectedElement.innerText = value;
                }

            }
        }


    });
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
            if (accordionItems.length > 1) {
                accordionItem.remove();
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
            var lastItemContent = lastItem.querySelector(".accordion-body").innerHTML;
            var lastId = lastItem ? lastItem.id : card.id + '-item-0';
            var lastNum = parseInt(lastId.split('-').pop()) || 0;
            var newId = card.id + '-item-' + (lastNum + 1);
            // console.log(lastNum)

            // Tüm elementleri seçin ve her birinin id özelliğini değiştirin
            var tempElement = document.createElement("div");
            tempElement.innerHTML = lastItemContent;
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
            console.log(newAccordionElements);
            for (let i = 0; i < newAccordionElements.length; i++) {
                // console.log(newAccordionElements[i])
                formElementListener(newAccordionElements[i])
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
                if (accordionItems.length > 1) {
                    accordionItem.remove();
                } else {
                    // Eğer silinecek olan item son item ise, uyarı göster
                    var deleteWarning = newIcon.closest(".accordion-button");
                    deleteWarning.style.backgroundColor = "#FFA07A";
                    // Uyarıyı belirli bir süre sonra kaldır
                    setTimeout(function () {
                        deleteWarning.style.backgroundColor = "";
                    }, 1000);
                }
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
            } else if (card.id == "card-3") {
                var sonBaglanti = cvCard.querySelector("article:last-child").id;
                var number = parseFloat(sonBaglanti.match(/\d+$/)?.[0]) + 1;
                console.log()
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
                console.log('BU ' + card.id + ' İD Lİ ALANDIR.')
            } else if (card.id == "card-5") {
                console.log('BU ' + card.id + ' İD Lİ ALANDIR')
            } else if (card.id == "card-6") {
                console.log('BU ' + card.id + ' İD Lİ ALANDIR')
            } else if (card.id == "card-7") {
                console.log('BU ' + card.id + ' İD Lİ ALANDIR')
            } else if (card.id == "card-8") {
                console.log('BURASI ' + card.id + ' İD Lİ ALANDIR')
            } else {
                console.log("CARD ID HATASI")
            }

        });
    };



});





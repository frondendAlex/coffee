document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const timeDateText = document.querySelector('.coffe__display-date');
  const coffeeContent = document.querySelector('.coffee__content');
  const coffeeContentItems = document.querySelectorAll('.coffee__content-item');
  const coffeeDisplayText = document.querySelector('.coffee__display-text span');

  const sectionCoffee = document.querySelector('.section-coffee');

  const displayContent = document.querySelector('.coffee__display-text');

  const coffeeContentBtns = document.querySelectorAll('.coffee__content-btn');

  const coffeePaymentPriceInput = document.querySelector('.coffee__payment-price');

  const greetingTitle = document.querySelector('.greeting__content-title');
  
  const coffeePaymentProgressBar = document.querySelector('.progress__bar');
  const progress = document.querySelector('.progress');
  const progressRow = document.querySelector('.progress__row');

  const modal = document.querySelector('.modal');
  const modalOverlow = document.querySelector('.modal__overlow');
  const modalWrap = document.querySelector('.modal__wrap');

  const modalContentCost = document.querySelector('.modal__content-cost');
  const modalContentChange = document.querySelector('.modal__content-change');
  const modalCoffeTitle = document.querySelector('.modal__coffe-title span');
  const modalContentDate = document.querySelector('.modal__content-date span');
  
  const coffeeError = document.querySelector('.coffee__display-error');

  const modalName = document.querySelector('.modalname');
  const modalnameBtn = document.querySelector('.modalname__btn');
  const modalnameTextError = document.querySelector('.modalname__text-error');
  const modalnameTextInput = document.querySelector('.modalname__text-input');

  // Открыть Модельное окно с добавлением кофе
  const openModalAddCoffee = document.querySelector('.coffee__payment-cook');
  const modalAddCoffee = document.querySelector('.addcoffee');
  const modalAddCoffeeClose = document.querySelector('.addcoffee__close');
  const modalCloseOverlow = document.querySelector('.addcoffee__overlow');

  // Инпуты Модельного окна с добавлением кофе
  const addCoffeeInputLabel = document.querySelectorAll('.addcoffee__form-input');
  const addcoffeeFormInputFile = document.querySelector('.addcoffee__form-input-file');
  const addcoffeeFormInputName = document.querySelector('.addcoffee__form-input-name');
  const addcoffeeFormInputCena = document.querySelector('.addcoffee__form-input-cena');
  const addcoffeeFormFileLabel = document.querySelector('.addcoffee__form-file-label');

  const addcoffeeFormRightImages = document.querySelector('.addcoffee__form-right-images');
  const addcoffeeFormBtn = document.querySelector('.addcoffee__form-btn');

  const coffeePaymentInfo = document.querySelector('.coffee__payment-info');

   // Форматы картинок
   const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ];

  let count = 5;
  let timeCLoseModal;
  let timeProgressBar = 0;
  let timeBlock;
  let timerBar;
  let result = 0;

  let day = new Date();
  let hour = day.getHours();

  // Загрузка страницы
  function appStart() {
    const greeting = document.querySelector('.greeting');
    const greetingOverlow = greeting.querySelector('.greeting__overlow');
    const greetingWrap = greeting.querySelector('.greeting__wrap');

    greeting.classList.add('active');
    greetingOverlow.classList.add('active');
    greetingWrap.classList.add('active');
    setInterval(() => {
      greeting.classList.remove('active');
      greetingOverlow.classList.remove('active');
      greetingWrap.classList.remove('active');
      sectionCoffee.classList.remove('hidden');
    }, 3000);
  }
  
  // Приветствие по времени
  if (hour >= 5 && hour < 12) {
    greetingTitle.textContent = 'Доброе утро';
  } else if (hour >= 12 && hour < 18) {
    greetingTitle.textContent = 'Добрый день';
  } else if (hour >= 18 && hour < 24) {
    greetingTitle.textContent = 'Добрый вечер';
  } else if (hour >= 0 && hour < 5) {
    greetingTitle.textContent = 'Доброй ночи';
  }

  // Проверка при входе и записываю имя
  modalnameBtn.addEventListener('click', () => {
    if (modalnameTextInput.value !== '') {
      const greetingContentName = document.querySelector('.greeting__content-name');
      
      modalName.classList.add('hidden');
      
      // Показывает блок что можно добавить свое кофе
      if (modalName.classList.contains('hidden')) {
        timeBlock = setInterval(timeBlockOpen, 8000);
        function timeBlockOpen() {
          coffeePaymentInfo.style.display = 'block';
          // document.querySelector('body').style.overflow = 'hidden';
        }
      }

      greetingContentName.textContent = modalnameTextInput.value;
      appStart();
    } else {
      modalnameTextError.classList.add('active');
    }
  })

  setInterval(() => {
    modalnameTextError.classList.remove('active');
  }, 2000);

  // Закрывается модельное окно при вводе имя
  if (!sectionCoffee.classList.contains('hidden')) {
    modalName.classList.remove('hidden');
  }

  modalnameTextInput.addEventListener('click', () => {
    modalnameTextError.classList.remove('active');
  })

  coffeeDisplayText.textContent = coffeeContentBtns[0].dataset.name;

  // let timeText = new Date().toLocaleTimeString().slice(0, -3);
  
  // Время на Display
  function clock() {
    let date = new Date();
    let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  
    timeDateText.textContent = hours + ':' + minutes + ':' + seconds;
  }

  setInterval(clock, 1000);
  clock();

  // Нет денег / не хватает
  const errorDisplay = () => {
    coffeeContentBtns.forEach(element => {
      let targetBtnPrice = element.dataset.price;
      if (coffeePaymentPriceInput.value < targetBtnPrice) {
        displayContent.style.display = 'none';
        coffeeError.classList.add('active')
        
      } else {
        coffeeError.classList.remove('active');
        displayContent.style.display = 'block';
      }
    });
  }

  coffeePaymentPriceInput.addEventListener('click', () => {
    coffeeContent.classList.remove('active');

    coffeeError.classList.remove('active');
      displayContent.style.display = 'block';
      coffeeContentItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const target = e.target.closest('.coffee__content-btn');
          if(target) {
            coffeeContentItems.forEach(item => {
              item.classList.remove('active');
            })
            item.classList.add('active');
          }
        })
      })
  })

  // Выбор кофе
  const coffeeContentActive = () => {

    coffeeContent.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.coffee__content-btn')) {
        const coffeeContentItems = document.querySelectorAll('.coffee__content-item');
        for (let i = 0; i < coffeeContentItems.length; i++) {
          coffeeContentItems[i].classList.remove('active');
        }
        target.closest('.coffee__content-item').classList.add('active');
      }

    });
    
  }

  coffeeContentActive();

  // Прогресс бар
  const progressBar = () => {
    timerBar = setInterval(frame, 80);
    function frame() {
      if(timeProgressBar < 100) {
        coffeePaymentProgressBar.style.width = timeProgressBar + '%';
        coffeePaymentProgressBar.firstChild.textContent = timeProgressBar + '%';
        timeProgressBar++;
      } else if (timeProgressBar === 100) {
        coffeePaymentProgressBar.classList.add('active');
        clearInterval(timerBar);
        coffeePaymentProgressBar.firstChild.textContent = '0' + '%';
        coffeePaymentProgressBar.style.width = '';
        modalOpen();
        document.querySelector('body').classList.add('active');
        progress.classList.remove('active');
        progressRow.classList.remove('active');
        timeCloseModel();
      }
    }
  }

  const coffeeBtn = () => {

    coffeeContent.addEventListener('click', e => {

      if(timeProgressBar !== 0 && timeProgressBar < 100) return;
      const target = e.target;
      const targetBtn = target.closest('.coffee__content-btn');
      
      if (targetBtn) {
        const coffeeBtnName = targetBtn.dataset.name;
        const coffeeBtnPrice = targetBtn.dataset.price;
        coffeeDisplayText.textContent = coffeeBtnName;

        if(parseInt(coffeeBtnPrice) <= parseInt(coffeePaymentPriceInput.value)) {

          progressBar();
          audioGo();
  
          progress.classList.add('active');
          progressRow.classList.add('active');
  
          result = parseInt(coffeePaymentPriceInput.value) - coffeeBtnPrice;
  
          modalContentCost.textContent = parseInt(coffeePaymentPriceInput.value) + ' ₽'
          modalContentChange.textContent = result + ' ₽';
          modalCoffeTitle.textContent = coffeeBtnName;
          modalContentDate.textContent = new Date().toLocaleTimeString();
          coffeePaymentPriceInput.value = result;
  
        } else {

          audioError();
          errorDisplay();
          coffeeContent.classList.add('active');
        }

      }

    })
  }

  // Звук когда не хватает денег
  function audioError() {
    let audioError = document.querySelector('.audio');
    audioError.play();
    audioError.autoplay = true;
  }

  // Звук когда готовится кофе
  function audioGo() {
    let audioGo = document.querySelector('.audio1');
    audioGo.play();
    audioGo.autoplay = true;
  }

  coffeeBtn();

  function modalOpen() {
    modal.classList.add('active');
    modalOverlow.classList.add('active');
    modalWrap.classList.add('active');
  }

  function modalClose() {
    modal.classList.remove('active');
    modalOverlow.classList.remove('active');
    modalWrap.classList.remove('active');

    modalContentCost.textContent = '';
    modalContentChange.textContent = '';
    modalCoffeTitle.textContent = '';
    coffeePaymentPriceInput.value = '';
    modalContentDate.textContent = '';

    coffeePaymentProgressBar.classList.remove('active');
    document.querySelector('body').classList.remove('active');
  }

  function timeCloseModel() {
    timeCLoseModal = setInterval(timeInterval, 1000);
    function timeInterval() {
      if(count > 0) {
        count--;
        document.querySelector('.modal__count-text span').textContent = count;
      } else if (count === 0) {
        clearInterval(timeCLoseModal);
        count = 6;
        modalClose();
      }
    }
  }

  // Focus & blur по нажатию инпут в форме добавления
  function addCoffeeInputLabelFocus() {
    addCoffeeInputLabel.forEach(element => {
      element.addEventListener('focus', () => {
        const label = element.nextElementSibling;
          label.classList.add('active');
      })
    });
  }
  
  addCoffeeInputLabelFocus();

  function addCoffeeInputLabelBlur() {
    addCoffeeInputLabel.forEach(element => {
      element.addEventListener('blur', () => {
        const label = element.nextElementSibling;
          if (element.value === '') {
            label.classList.remove('active');
          }
      })
    });
  
  }

  addCoffeeInputLabelBlur();
  
  // Input file загрузка
  let inputsFile = document.querySelectorAll('.addcoffee__form-input-file');
    Array.prototype.forEach.call(inputsFile, function (input) {
      let labelText = input.nextElementSibling;
      let labelVal = labelText.querySelector('.addcoffee__form-file-label span').innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1) {
          countFiles = this.files.length;
        }
        
        if (countFiles) {
          labelText.querySelector('.addcoffee__form-file-label span').innerText = 'Выбрано файлов: ' + countFiles;
        } else {
          labelText.querySelector('.addcoffee__form-file-label span').innerText = labelVal;
        }
        
      });
    });

  // Анимацию при движении курсора
  const modalnameContentCursor = document.querySelector('.modalname__content');
  window.addEventListener('mousemove', (e) => {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    modalnameContentCursor.style.transform = 'translate(-' + x * 30 + 'px, +' + y * 20 + 'px)';
  })

  // Добавления своего кофе
  addcoffeeFormBtn.addEventListener('click', () => {
  
    const addcoffeeFormInputNameValue = addcoffeeFormInputName.value;
    const addcoffeeFormInputCenaValue = parseInt(addcoffeeFormInputCena.value);

    if(addcoffeeFormInputName.value === '' || addcoffeeFormInputCena.value === '' || addcoffeeFormRightImages.currentSrc === '') {

      if(addcoffeeFormInputName.value === '') {
        addcoffeeFormInputName.style.border = '3px solid red';
      }

      if (addcoffeeFormInputCena.value === '') {
        addcoffeeFormInputCena.style.border = '3px solid red';
      }

      if(addcoffeeFormRightImages.currentSrc === '') {
        addcoffeeFormFileLabel.style.border = '3px solid red';
      }
      
    } else {
      let coffeeContentItem = `
      <div class="coffee__content-item">
        <div class="coffee__content-img">
            <button class="coffee__content-btn" data-name="${addcoffeeFormInputNameValue}" data-price="${addcoffeeFormInputCenaValue}">
                <img class="coffee__name-img" src="${addcoffeeFormRightImages.src}" alt="Кофе">
            </button>
        </div>
        <div class="coffee__content-text">
            <p class="coffee__name-text">${addcoffeeFormInputNameValue} - <span class="coffee__name-price">${addcoffeeFormInputCenaValue} ₽</span></p>
        </div>
      </div>
    `
    coffeeContent.insertAdjacentHTML('beforeend', coffeeContentItem);
    closeModalAdd();
    addcoffeeFormInputName.value = '';
    addcoffeeFormInputCena.value = '';
    addcoffeeFormRightImages.src = '';
    document.querySelector('.addcoffee__form-file-label span').textContent = 'Прикрепить файл';
    }

  })

  // Проверка на пустоту инпутов в добавлении кофе
  function addCoffeeInput() {
    addCoffeeInputLabel.forEach(element => {
      element.addEventListener('input', (e) => {
        let inputValue = e.target.value;
        if (inputValue !== '') {
          addcoffeeFormInputName.style.border = '';
          addcoffeeFormInputCena.style.border = '';
          addcoffeeFormFileLabel.style.border = '';
        }
      })
    });
  }

  addCoffeeInput();

  // Добавление картинки
  addcoffeeFormInputFile.addEventListener('change', () => {
    const addcoffeeFormRightTextError = document.querySelector('.addcoffee__form-right-text');
    let filesImg = addcoffeeFormInputFile.files;

    if (filesImg.length === 0) {
      addcoffeeFormRightImages.src = '';
      document.querySelector('.addcoffee__form-file-label span').textContent = 'Прикрепить файл';
    } else {

       for (let i = 0; i < filesImg.length; i++) {
        addcoffeeFormRightTextError.classList.add('active');

        if (validFileType(filesImg[i])) {
          addcoffeeFormRightImages.src = URL.createObjectURL(filesImg[i]);
          addcoffeeFormRightTextError.classList.remove('active');
        }
       }

    }
  })

  // Валидация на формат
  function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      } else {
        document.querySelector('.addcoffee__form-file-label span').textContent = 'Прикрепить файл';
        addcoffeeFormRightImages.src = '';
      }
    }
  }

  // Открытие/Закрытие модельного окна
  function openModalAdd() {
    modalAddCoffee.classList.add('active');
    document.body.style.overflowY = 'hidden';
    openModalAddCoffee.removeAttribute('go');

    if (!openModalAddCoffee.hasAttribute('go')) {

      setInterval(() => {
        coffeePaymentInfo.style.display = 'none';
      }, '');

      clearInterval(timeBlock);
    }
  }

  function closeModalAdd() {
    modalAddCoffee.classList.remove('active');
    document.body.style.overflowY = '';
  }

  function modalAddCloseOverlow() {
    closeModalAdd()
  }

  openModalAddCoffee.addEventListener('click', openModalAdd);
  modalAddCoffeeClose.addEventListener('click', closeModalAdd);
  modalCloseOverlow.addEventListener('click', modalAddCloseOverlow);

});
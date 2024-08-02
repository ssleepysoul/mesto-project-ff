(()=>{"use strict";var t;function e(t,e){"Escape"===e.key&&n(t)}function o(o){o.classList.add("popup_is-opened"),t=e.bind(document,o),document.addEventListener("keydown",t)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)}function r(t){var e=t.cardTemplate.querySelector(".card").cloneNode(!0);e.querySelector(".card__title").textContent=t.cardData.name;var n=e.querySelector(".card__image");n.src=t.cardData.link,n.alt=t.cardData.name;var r=e.querySelector(".card__delete-button"),c=document.querySelector(".popup_type_image"),a=c.querySelector(".popup__image"),i=e.querySelector(".card__like-button"),u=c.querySelector(".popup__caption");e.setAttribute("data-id","".concat(t.cardData._id));var s=t.cardData.likes.map((function(t){return t._id})).join(",");if(e.setAttribute("data-id-likes",s),t.cardData.likes.length>0){var l=e.querySelector(".card__like-counter");l.textContent=t.cardData.likes.length,l.classList.remove("visibility-hidden")}return t.cardData.owner._id!==t.profileId&&e.querySelector(".card__delete-button").setAttribute("style","display:none"),e.dataset.idLikes.includes(t.profileId)&&i.classList.add("card__like-button_is-active"),r.addEventListener("click",(function(t){var e=document.querySelector(".popup_type_confirm"),n=t.target.closest(".card").dataset.id;e.setAttribute("data-card-id","".concat(n)),o(e)})),n.addEventListener("click",(function(){t.openImagePopupFn(a,n,u)})),i.addEventListener("click",(function(){t.likeCard(i)})),e}function c(t){t.remove()}function a(t,e,o){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(t,e,n),o&&(n.value="")})),i(t,n,r)}function i(t,e,o){!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(o.disabled=!1,o.classList.remove(t.inactiveButtonClass)):(o.disabled=!0,o.classList.add(t.inactiveButtonClass))}function u(t,e,o){var n=e.querySelector(".".concat(o.id,"-error"));o.classList.remove(t.inputErrorClass),n.classList.remove(t.errorClass),n.textContent=""}var s,l="7c46cc38-bd4c-4046-ace1-77598f6b8fb2",d=document.querySelector(".places__list"),p=document.querySelector("#card-template").content,f=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),y=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_image"),S=h.querySelector(".popup__close"),k=document.querySelector(".popup_type_new-card"),b=k.querySelector(".popup__form"),q=k.querySelector(".popup__close"),L=document.querySelector(".popup_type_confirm"),g=L.querySelector(".popup__close"),E=L.querySelector(".popup__button_confirm"),C=document.querySelector(".popup_type_edit"),j=C.querySelector(".popup__form"),A=C.querySelector(".popup__input_type_name"),P=C.querySelector(".popup__input_type_description"),x=C.querySelector(".popup__close"),D=k.querySelector(".popup__input_type_card-name"),T=k.querySelector(".popup__input_type_url"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error-visible"},I=document.querySelector(".popup_type_edit_avatar"),z=I.querySelector(".popup__form"),B=I.querySelector(".popup__close"),F=z.querySelector(".popup__input");function N(t,e,n){t.src=e.src,t.alt=e.alt,n.textContent=e.alt,o(h)}function O(t){var e=document.body.dataset.userId,o=t.closest(".card"),n=o.dataset.id;o.dataset.idLikes.includes(e)?function(t){return fetch("https://nomoreparties.co/v1/wff-cohort-19/cards/likes/".concat(t),{method:"DELETE",headers:{authorization:l}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(n).then((function(e){t.classList.remove("card__like-button_is-active");var n=e.likes.map((function(t){return t._id})).join(",");if(o.setAttribute("data-id-likes",n),0===e.likes.length)o.querySelector(".card__like-counter").classList.add("visibility-hidden");else{var r=o.querySelector(".card__like-counter");r.textContent=e.likes.length,r.classList.remove("visibility-hidden")}})).catch((function(t){console.log(t)})):function(t){return fetch("https://nomoreparties.co/v1/wff-cohort-19/cards/likes/".concat(t),{method:"PUT",headers:{authorization:l}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(n).then((function(e){t.classList.add("card__like-button_is-active");var n=e.likes.map((function(t){return t._id})).join(",");if(o.setAttribute("data-id-likes",n),e.likes.length>0){var r=o.querySelector(".card__like-counter");r.textContent=e.likes.length,r.classList.remove("visibility-hidden")}})).catch((function(t){console.log(t)}))}function J(t){t.querySelector(".popup__button").textContent="Сохранение..."}function M(t){setTimeout((function(){t.querySelector(".popup__button").textContent="Сохранить"}),400)}f.addEventListener("click",(function(){o(C),function(t,e,o,n){t.value=o.textContent,e.value=n.textContent}(A,P,_,m),a(w,j,!1)})),x.addEventListener("click",(function(){n(C)})),C.addEventListener("click",(function(t){t.target===C&&n(C)})),j.addEventListener("submit",(function(t){var e,o;t.preventDefault(),J(j),(e=A.value,o=P.value,fetch("https://nomoreparties.co/v1/wff-cohort-19/users/me",{method:"PATCH",headers:{authorization:l,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){_.textContent=t.name,m.textContent=t.about,n(C),M(j)})).catch((function(t){console.log(t)}))})),y.addEventListener("click",(function(){o(k),a(w,b,!0)})),b.addEventListener("submit",(function(t){var e,o;t.preventDefault(),J(b),(e=D.value,o=T.value,fetch("https://nomoreparties.co/v1/wff-cohort-19/cards",{method:"POST",headers:{authorization:l,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){!function(t,e,o){var n=r({cardData:o,deleteCardFn:c,cardTemplate:t,openImagePopupFn:e,likeCard:O});n.querySelector(".card__delete-button").setAttribute("style","display:block"),d.prepend(n)}(p,N,t),n(k),b.reset(),M(b)})).catch((function(t){console.log(t)}))})),q.addEventListener("click",(function(){n(k)})),k.addEventListener("click",(function(t){t.target===k&&n(k)})),S.addEventListener("click",(function(){n(h)})),h.addEventListener("click",(function(t){t.target===h&&n(h)})),s=w,Array.from(document.querySelectorAll(s.formSelector)).forEach((function(t){var e=Array.from(t.querySelectorAll(s.inputSelector)),o=t.querySelector(s.submitButtonSelector);i(s,e,o),e.forEach((function(n){n.addEventListener("input",(function(){!function(t,e,o){o.validity.patternMismatch?o.setCustomValidity(o.dataset.errorMessage):o.setCustomValidity(""),o.validity.valid?u(t,e,o):function(t,e,o,n){var r=e.querySelector(".".concat(o.id,"-error"));o.classList.add(t.inputErrorClass),r.textContent=n,r.classList.add(t.errorClass)}(t,e,o,o.validationMessage)}(s,t,n),i(s,e,o)}))}))})),Promise.all([fetch("https://nomoreparties.co/v1/wff-cohort-19/users/me",{headers:{authorization:l}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch("https://nomoreparties.co/v1/wff-cohort-19/cards",{headers:{authorization:l}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){var e=t[0],o=t[1],n=t[0]._id;_.textContent=e.name,m.textContent=e.about,v.style.backgroundImage="url(".concat(e.avatar,")"),document.body.setAttribute("data-user-id",n),o.forEach((function(t){var e=r({cardData:t,deleteCardFn:c,cardTemplate:p,openImagePopupFn:N,likeCard:O,profileId:n});d.append(e)}))})).catch((function(t){console.log(t)})),g.addEventListener("click",(function(){n(L)})),L.addEventListener("click",(function(t){t.target===L&&n(L)})),E.addEventListener("click",(function(t){var e=t.target.closest(".popup_type_confirm"),o=e.dataset.cardId;(function(t){return fetch("https://nomoreparties.co/v1/wff-cohort-19/cards/".concat(t),{method:"DELETE",headers:{authorization:l}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(o).then((function(t){document.querySelector('[data-id="'.concat(o,'"]')).remove()})).catch((function(t){console.log(t)})),n(e)})),v.addEventListener("click",(function(){o(I),a(w,z,!0)})),B.addEventListener("click",(function(){n(I)})),I.addEventListener("click",(function(t){t.target===I&&n(I)})),z.addEventListener("submit",(function(t){var e;t.preventDefault(),J(z),(e=F.value,fetch("https://nomoreparties.co/v1/wff-cohort-19/users/me/avatar",{method:"PATCH",headers:{authorization:l,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){v.style.backgroundImage="url(".concat(t.avatar,")"),n(I),M(z)})).catch((function(t){console.log(t)}))}))})();
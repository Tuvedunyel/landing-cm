($ => {
    $(() => {
        const popin = $('.popin')
        const contactForm = $('#contact', popin)
        const body = $('body')
        const popinRemerciement = $('.popin-remerciement')
        let theme
        $('.accordion-title').on('click', (e) => {
            const accordionSection = $(e.currentTarget).parent()

            if (accordionSection.hasClass('open')) {
                accordionSection.removeClass('open')
            } else {
                $('.accordion-section').removeClass('open')
                accordionSection.addClass('open')
            }
        })

        $('.more-visibility').on('click', (e) => {
            const currentItem = $(e.currentTarget)
            const popinTitle = $('.popin-title')
            theme = currentItem.data('theme')
            const popinTitleValue = currentItem.data('title')
            const popinLogo = $('.popin-logo')
            const popinLogoBis = $('.popin-logo-bis')
            const popinLogoSrc = currentItem.data('image')

            $('#theme-input').val(theme);
            popinTitle.html(popinTitleValue)
            popinLogo.attr('src', popinLogoSrc)
            popinLogoBis.attr('src', popinLogoSrc)
            popin.addClass(theme).addClass('open')
            popinRemerciement.addClass(theme)
            body.addClass('popin-open')
            return theme
        })

        $('.popin, .popin-close, .popin-remerciement').on('click', (e) => {
            if ($(e.target).hasClass('popin') || $(e.target).hasClass('popin-close') || $(e.target).hasClass('popin-remerciement')) {
                popin.removeClass('open').removeClass(theme)
                popinRemerciement.removeClass('open').removeClass(theme)
                body.removeClass('popin-open')
            }
        })

        $('#phone').on('input', function () {
            let phoneNumber = $(this).val().replace(/\s/g, '') // Supprimer les espaces existants
            let formattedPhoneNumber = ''

            for (let i = 0; i < phoneNumber.length; i++) {
                formattedPhoneNumber += phoneNumber.charAt(i)

                if ((i + 1) % 2 === 0 && i !== phoneNumber.length - 1) {
                    formattedPhoneNumber += ' '
                }
            }

            $(this).val(formattedPhoneNumber)
        })

        //////////////////////////////////////////////////////////////////////////////////////////////////
        // Limite de caractères pour le champ de texte
        const characterLimit = 1000

        // Mettre à jour l'affichage de la limite de caractères
        function updateCharacterCount() {
            const message = $('#message').val()
            let remainingCharacters = characterLimit - message.length

            // Vérifier si le nombre de caractères dépasse la limite
            if (remainingCharacters < 0) {
                remainingCharacters = 0
                $('#message').val(message.slice(0, characterLimit)) // Tronquer le contenu du champ de texte
            }

            // Vérifier si l'élément #character-count existe déjà
            const characterCountElement = $('#character-count')
            if (characterCountElement.length > 0) {
                characterCountElement.text(remainingCharacters + ' caractères restants')
            } else {
                $('<span id="character-count" class="limit-message">' + remainingCharacters + ' caractères restants</span>').insertAfter('#message')
            }
        }

        // Écouter l'événement input sur le champ de texte
        $('#message').on('input', function () {
            updateCharacterCount()
        })

        $('form').attr('novalidate', true)

        $('input').on('input', function () {
            const inputId = $(this).attr('id')
            const errorId = inputId + '-error'
            $('.' + errorId).remove()
        
            $(this).removeClass('error')
            $(this).prev().removeClass('error')
        });
        
        contactForm.on('submit', (e) => {
            let validForm = true
            /////////////////////////////////// Champ NAME //////////////////////////////////////////////////
            const nameInput = $('#name')
            const nameValue = nameInput.val()
            const labelForName = $("label[for='name']")

            // Réinitialisation des styles
            nameInput.add(labelForName).removeClass('error')
            $('.name-error').remove()

            // Vérification de la longueur de l'entrée
            if (nameValue.length > 100 || nameValue.length < 1) {
                labelForName.add(nameInput).addClass('error')
                $('<span class="error-message name-error">Doit être compris entre 1 et 100 caractères.</span>').insertAfter(nameInput)
                validForm = false
            }
            // Vérification des caractères alphabétiques minuscules ou majuscules
            if (!/^[a-zA-Z]+$/.test(nameValue)) {
                labelForName.add(nameInput).addClass('error')
                $('<span class="error-message name-error">Ne doit contenir que des lettres alphabétiques minuscules ou majuscules.</span>').insertAfter(nameInput)
                validForm = false
            }


            /////////////////////////////////// Champ SOCIETY //////////////////////////////////////////////////
            const societyInput = $('#society')
            const societyValue = societyInput.val()
            const labelForSociety = $("label[for='society']")

            // Réinitialisation des styles
            societyInput.add(labelForSociety).removeClass('error')
            $('.society-error').remove()

            // Vérification de la longueur de l'entrée
            if (societyValue.length > 100 || societyValue.length < 1) {
                labelForSociety.add(societyInput).addClass('error')
                $('<span class="error-message society-error">Doit être compris entre 1 et 100 caractères.</span>').insertAfter(societyInput)
                validForm = false
            }

            /////////////////////////////////// Champ EMAIL //////////////////////////////////////////////////
            const emailInput = $('#email')
            const emailValue = emailInput.val()
            const labelForEmail = $("label[for='email']")

            // Réinitialisation des styles
            emailInput.add(labelForEmail).removeClass('error')
            $('.email-error').remove()

            // Vérification de l'email
            if (!isValidEmail(emailValue)) {
                labelForEmail.add(emailInput).addClass('error')
                $('<span class="error-message email-error">Doit contenir un email valide.</span>').insertAfter(emailInput)
                validForm = false
            }

            // Fonction pour vérifier si l'e-mail est valide
            function isValidEmail(emailValue) {
                // Expression régulière complexe pour la validation de l'e-mail
                const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

                // Vérifier si l'e-mail correspond à l'expression régulière
                return emailRegex.test(emailValue)
            }



            ////////////////////////////////////////// Champ PHONE/////////////////////////////////////////////////////////////
            const phoneInput = $('#phone')
            const phoneValue = phoneInput.val().replace(/\s/g, '')
            const labelForPhone = $("label[for='phone']")

            // Réinitialisation des styles
            phoneInput.add(labelForPhone).removeClass('error')
            $('.phone-error').remove()

            // Vérifier si le téléphone est valide
            if (!isValidPhone(phoneValue)) {
                labelForPhone.add(phoneInput).addClass('error')
                $('<span class="error-message phone-error">Doit contenir un téléphone valide.</span>').insertAfter(phoneInput)
                validForm = false
            }

            // Fonction pour vérifier si le téléphone est valide
            function isValidPhone(phoneValue) {
                // Expression régulière pour la validation du téléphone
                const phoneRegex = /^\d{10}$/ig

                // Vérifier si le téléphone correspond à l'expression régulière
                return phoneRegex.test(phoneValue)
            }

            /////////////////////////////////// Champ ADDRESS //////////////////////////////////////////////////
            const addressInput = $('#address')
            const addressValue = addressInput.val()
            const labelForAddress = $("label[for='address']")

            // Réinitialisation des styles
            addressInput.add(labelForAddress).removeClass('error')
            $('.address-error').remove()

            // Vérification de la longueur de l'entrée
            if (addressValue.length > 100 || addressValue.length < 1) {
                labelForAddress.add(addressInput).addClass('error')
                $('<span class="error-message address-error">Doit être compris entre 1 et 100 caractères.</span>').insertAfter(addressInput)
                validForm = false
            }

            /////////////////////////////////// Champ CITY //////////////////////////////////////////////////
            const cityInput = $('#city')
            const cityValue = cityInput.val()
            const labelForCity = $("label[for='city']")

            // Réinitialisation des styles
            cityInput.add(labelForCity).removeClass('error')
            $('.city-error').remove()

            // Vérification de la longueur de l'entrée
            if (cityValue.length > 100 || cityValue.length < 1) {
                labelForCity.add(cityInput).addClass('error')
                $('<span class="error-message city-error">Doit être compris entre 1 et 100 caractères.</span>').insertAfter(cityInput)
                validForm = false
            }

            ////////////////////////////////////  Test Validité Formulaire ////////////////////////////////////////
            if (validForm) {
                console.log("formulaire valide")
                e.preventDefault()
                popinRemerciement.addClass('open')
                popin.removeClass('open')
            } else {
                console.log("formulaire non valide")
                e.preventDefault()

                // Faire défiler la popin jusqu'à .popin-logo avec animation
                const popin = $('.popin')
                const popinLogo = $('.popin-logo')
                const scrollTopValue = popinLogo.offset().top - popin.offset().top + popin.scrollTop()

                popin.animate({
                    scrollTop: scrollTopValue
                }, 500)
            }
        })
    })
})(jQuery)
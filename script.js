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
            theme = currentItem.data('theme');
            const popinTitleValue = currentItem.data('title')
            const popinLogo = $('.popin-logo')
            const popinLogoSrc = currentItem.data('image')

            popinTitle.html(popinTitleValue)
            popinLogo.attr('src', popinLogoSrc);
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
        });

        $('#phone').on('input', function () {
            let phoneNumber = $(this).val().replace(/\s/g, ''); // Supprimer les espaces existants
            let formattedPhoneNumber = '';

            for (let i = 0; i < phoneNumber.length; i++) {
                formattedPhoneNumber += phoneNumber.charAt(i);

                if ((i + 1) % 2 === 0 && i !== phoneNumber.length - 1) {
                    formattedPhoneNumber += ' ';
                }
            }

            $(this).val(formattedPhoneNumber);
        });
        $('input[name=phone]').on('input', function() {
            const phone = $(this).val();
            console.log(phone);
          });

        contactForm.on('submit', (e) => {
            e.preventDefault()
            const phone = $('input[name=phone]').val()
            const num = /[0-9]+/ig
            console.log(phone)
            if (!phone.match(num)) {
                $('input[name=phone]').get(0).setCustomValidity('Le numéro de téléphone est invalide.')
            } else {
                popinRemerciement.addClass('open')
                popin.removeClass('open')
            }
        })
    })
})(jQuery)
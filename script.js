($ => {
    $(() => {
        const popin = $('.popin')
        const contactForm = $('#contact', popin)
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
            const theme = currentItem.data('theme')
            const popinTitleValue = currentItem.data('title')

            popinTitle.html(popinTitleValue)
            popin.addClass(theme).addClass('open')
        })
        $('.popin-close').on('click', () => {
            popin.removeClass('open')
        })
        contactForm.on('submit', e => {
            const firstname = $('input[name=firstname]').val()
            const num = /[0-9]+/ig
            firstname.match(num) ? console.log('success') : console.log('fail')
            return false
        })
    })
})(jQuery)
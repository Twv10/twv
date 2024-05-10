$('#contactForm').validate({
    /* submit via ajax */
    submitHandler: function(form) {
        var sLoader = $('.submit-loader');

        // Show loader before sending email
        sLoader.slideDown("slow");

        // Serialize form data
        var formData = $(form).serialize();

        // Call sendEmail function with formData
        sendEmail(formData)
            .then(function() {
                // Email sent successfully
                sLoader.slideUp("slow");
                $('.message-warning').fadeOut();
                $('#contactForm').fadeOut();
                $('.message-success').fadeIn();
            })
            .catch(function(error) {
                // Error sending email
                sLoader.slideUp("slow");
                $('.message-warning').html("Error sending email. Please try again.");
                $('.message-warning').slideDown("slow");
            });

        // Prevent form submission (handled by AJAX)
        return false;
    }
});
function decodeFormData(formDataString) {
    var formData = {};
    var pairs = formDataString.split('&');
    pairs.forEach(function(pair) {
        var keyValue = pair.split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        formData[key] = value;
    });
    return formData;
}
function sendEmail(formData) {
    return new Promise(function(resolve, reject) {
        // Initialize EmailJS with your User ID
        emailjs.init('CcN2P_3HZuyjCB4EO');
    
        

        // Use EmailJS API to send the email
        emailjs.send('service_sd0m27n', 'template_t4ds7p2', decodeFormData(formData))
            .then(function(response) {
                resolve(); // Resolve promise when email is sent successfully
            }, function(error) {
                reject(error); // Reject promise with error if email sending fails
            });
    });
}
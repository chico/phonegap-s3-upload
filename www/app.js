(function () {

    var $img = $('img', '.scroller'),

        // Take a picture using the camera
        takePicture = function (e) {
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            };

            navigator.camera.getPicture(
                function (imageURI) {
                    alert(imageURI);
                    // $img.attr('src', imageURI);
                    var fileName = "" + (new Date()).getTime() + ".jpg"; // consider a more reliable way to generate unique ids
                    s3Uploader.upload(imageURI, fileName)
                        .done(function () {
                            alert("S3 upload succeeded");
                        })
                        .fail(function (e) {
                            alert("S3 upload failed - " + e.code);
                        });
                },
                function (message) {
                    alert("whoops - " + message);
                    // We typically get here because the use canceled the photo operation. Fail silently.
                },
                {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );

            return false;

        };

    $('.camera-btn').on('click', takePicture);

}());
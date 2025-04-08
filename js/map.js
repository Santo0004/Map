document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi peta
    var map = L.map('map', {
        fullscreenControl: true
    }).setView([1.500016, 124.840478], 7);

    // Layer peta
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Kontrol pencarian
    var geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
        var center = e.geocode.center;
        map.setView(center, 13);
    })
    .addTo(map);

    // Load data lokasi
    fetch('data/lokasi.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(lokasi => {
                var marker = L.marker([lokasi.lat, lokasi.lng]).addTo(map);
                var popupContent = `
                    <div style="text-align: center;">
                        <img src="img/${lokasi.folder}/1.jpg" alt="${lokasi.nama}" width="150" height="100" style="border-radius: 5px;"><br>
                        <strong>${lokasi.nama}</strong><br>
                        Risiko: ${lokasi.risiko}<br><br>
                        <a href="${lokasi.googleMapsLink}" target="_blank" style="display: inline-block; padding: 5px 10px; background: #007BFF; color: #fff; text-decoration: none; border-radius: 3px;">Buka di Google Maps</a>
                        <br><br>
                        <a href="detail.html?id=${lokasi.id}" style="display: inline-block; padding: 5px 10px; background: #28A745; color: #fff; text-decoration: none; border-radius: 3px;">Detail Tempat</a>
                    </div>
                `;
                marker.bindPopup(popupContent);
            });
        })
        .catch(error => console.error('Error fetching lokasi.json:', error));
});

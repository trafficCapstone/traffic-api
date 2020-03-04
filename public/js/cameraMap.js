if (document.getElementById('camera-map-container')) {
  const map = L.map('camera-map-container').setView([45.52, -122.67], 12);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
    },
  ).addTo(map);

  cameras.forEach(camera => {
    const marker = L.marker(camera.location, {
      title: camera.name,
      riseOnHover: true,
    });

    const link = window.location.href + 'live-stream?id=' + camera.id;
    marker
      .bindPopup(
        `<p><strong>id: </strong>${camera.id}</p>
      <p><strong>name: </strong>${camera.name}</p>
      <p><a href="${link}">Link</a></p>`,
      )
      .openPopup();

    marker.addTo(map);
  });
}
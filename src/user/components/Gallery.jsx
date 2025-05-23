function Gallery() {
  const images = [
    'https://source.unsplash.com/400x300/?food',
    'https://source.unsplash.com/400x300/?restaurant',
    'https://source.unsplash.com/400x300/?cuisine',
  ];

  return (
    <div className="mt-4">
      <h2>Gallery</h2>
      <div className="row">
        {images.map((src, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <img src={src} alt="Food" className="img-fluid rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

const MapaUbicacion = () => {
    return (
      <section className="w-full mt-16 px-4 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 bg-[#111111] bg-opacity-80 rounded-xl py-10 px-6 shadow-lg">
          {/* Texto descriptivo */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#f1c40f] mb-4">
              📍 Visitá nuestro local
            </h2>
            <p className="text-base lg:text-lg text-neutral-300 leading-relaxed">
              Nos encontramos en el <strong>corazón de Jujuy</strong>, dentro de la <strong>Galería Necochea</strong>,
              un punto de referencia ideal en pleno centro. Nuestro espacio está diseñado para brindarte
              una experiencia relajada, moderna y personalizada. <br className="hidden lg:block" />
              <br />
              ¡Te esperamos con los brazos abiertos!
            </p>
          </div>
  
          {/* Mapa embed */}
          <div className="w-full lg:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe src="https://www.google.com/maps/embed?pb=!4v1754596316917!6m8!1m7!1sa8H5uKA9VNV9ZITID-vggA!2m2!1d-24.18605701684177!2d-65.30410036304686!3f73.38663718592835!4f-4.887964494841825!5f0.7820865974627469" width="600" height="450"></iframe>
          </div>
        </div>
      </section>
    );
  };
  
  export { MapaUbicacion };
    
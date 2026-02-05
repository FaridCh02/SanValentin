import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import mixpanel from './lib/mixpanel';

function App() {
  const jsConfetti = new JSConfetti();

  const [randomValor, setRandomValor] = useState({});
  const [valueSi, setValueSi] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState('relative');

  const random = [
    {
      description: 'Di si por favor',
      img: 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif',
    },
    {
      description: 'Piénsalo de nuevo.',
      img: 'https://i.pinimg.com/originals/77/6b/21/776b215bed3deeef47fd3aa657685a18.gif',
    },
    {
      description: 'Vamos, atrévete a decir que sí.',
      img: 'https://media.tenor.com/DTmYqda3ZokAAAAi/peachandgoma.gif',
    },
    {
      description: 'No tengas miedo, será genial.',
      img: 'https://i.pinimg.com/originals/e1/c3/88/e1c388133e0f998e25bb17c837b74a14.gif',
    },
  ];

  const randomResponse = () => {
    mixpanel.track('Boton No Clickeado');

    let randX = Math.random() * 70;
    let randY = Math.random() * 60;

    let index = Math.floor(Math.random() * random.length);
    setPosition('absolute');
    setButtonPosition({ top: randY, left: randX });
    setRandomValor(random[index]);
  };

  useEffect(() => {
    mixpanel.track('Pagina Cargada');
  }, []);

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-white px-4">
      {!valueSi ? (
        <div className="text-center flex flex-col items-center">
          
          <h1 className="font-bold text-4xl md:text-5xl mb-6">
            ¿Quieres ser mi San Valentín?
          </h1>

          <img
            src={
              Object.keys(randomValor).length === 0
                ? 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif'
                : randomValor.img
            }
            alt="San Valentin"
            className="h-[200px] mb-10"
          />

          {/* CONTENEDOR DE BOTONES */}
          <div className="flex gap-8 w-[600px] max-w-full justify-center relative">
            
            {/* BOTÓN SÍ */}
            <button
              onClick={() => {
                mixpanel.track('Boton Si Clickeado');
                setValueSi(true);

                jsConfetti.addConfetti({
                  emojis: ['😍', '🥰', '❤️', '😘'],
                  emojiSize: 70,
                  confettiNumber: 200,
                });
              }}
              className="bg-green-500 hover:bg-green-600 transition text-white font-bold py-3 w-full rounded-lg text-xl shadow-lg"
            >
              Sí
            </button>

            {/* BOTÓN NO (SE MUEVE) */}
            <button
              className="bg-red-500 hover:bg-red-600 transition text-white font-bold py-3 w-full rounded-lg text-xl shadow-lg"
              onMouseOver={randomResponse}
              style={{
                position: position,
                top: `${buttonPosition.top}%`,
                left: `${buttonPosition.left}%`,
              }}
            >
              {Object.keys(randomValor).length === 0
                ? 'No'
                : randomValor.description}
            </button>

          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-8 text-center">
          <h1 className="text-4xl font-bold">Sabía que dirías que sí ❤️</h1>
          <img
            src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif"
            alt=""
            className="mx-auto"
          />
        </div>
      )}
    </main>
  );
}

export default App;

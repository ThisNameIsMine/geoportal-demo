import Options from "./_sections/Options";
import Benefits from "./_sections/Benefits";
import MoreOptions from "./_sections/MoreOptions";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-primary">
      
      <div
        className="absolute inset-0 z-0"  // Ensure the background has a lower z-index
        style={{
          backgroundImage: "url('/images/background1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(0px)", // Apply blur to the background
        }}
      ></div>
      <Header />
      <div className="hero bg-primary min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-sm md:max-w-xl">
            <h1 className="text-3xl md:text-6xl font-bold text-white ">
              Inovatívny portál KSK pre{" "}
              <span className="text-secondary">ľudí</span> a firmy
            </h1>

            <p className="py-6 text-[#FFC843] text-xl">
              Košický kraj ponúka strategickú polohu, kvalifikovanú pracovnú
              silu a modernizovanú infraštruktúru, ideálne podmienky pre rast
              vášho podnikania.
            </p>
            <a href="#moznosti">
              <button className="btn bg-secondary text-white hover:bg-hover border-none">
                Poďme na to!
              </button>
            </a>
          </div>
        </div>
      </div>
      <Benefits />
      <Options />
      <MoreOptions />
    </div>
  );
}

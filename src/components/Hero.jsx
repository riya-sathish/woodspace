    import { useState, useEffect } from "react";
    import img1 from "../assets/Main.png";
    import img2 from "../assets/slide2.jpg";
    import img3 from "../assets/slide3.jpg";
    import image1 from "../assets/image 40.png";
    import image2 from "../assets/image 42.png";
    import image3 from "../assets/image 43.png";
    import "../styles/hero.css";

    const slides = [
    {
        title: "WoodSpace Chair Collection",
        desc: "Find hand-curated collections that fit your style, space, and budget.",
        bg: img1,
        images: [image1, image2, image3],
    },
    {
        title: "Luxury Wooden Series",
        desc: "Elegant and timeless wooden furniture for your home.",
        bg: img2,
        badge: "New Arrival",
        features: ["Handcrafted", "Premium Wood", "Eco-Friendly"],
    },
    {
        title: "Modern Comfort Collection",
        desc: "Discover premium furniture designed for modern living spaces.",
        bg: img3,
        badge: "Trending Now",
        features: ["Modern Design", "Comfort First", "Durable"],
    },
    ];

    function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const slide = slides[current];

    return (
        <>
        
        <div
            className={`hero ${current !== 0 ? "has-overlay" : ""}`}
            style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundPosition:
                current === 0
                ? "center bottom"
                : current === 1
                ? "30% bottom"
                : "70% bottom",
            }}
        >
            <div className="left">
            {current !== 0 && slide.badge && (
                <span className="slide-badge">{slide.badge}</span>
            )}
            <h1>
                WoodSpace <br />
                {slide.title.replace("WoodSpace ", "")}
            </h1>
            <p>{slide.desc}</p>
            {current !== 0 && slide.features && (
    <div className={`feature-pills ${current === 1 ? "pills-stacked" : ""}`}>
        {slide.features.map((f, i) => (
        <span key={i} className="pill">{f}</span>
        ))}
    </div>
    )}
            <button>Shop Now</button>
            </div>

            {current === 0 && (
            <div className="right">
                <div className="small-images">
                <img src={slide.images[1]} alt="" />
                <img src={slide.images[2]} alt="" />
                </div>
                <div className="big-image">
                <img src={slide.images[0]} alt="" />
                </div>
            </div>
            )}
        </div>
        

        <div className="hero-dots-center">
            {slides.map((_, i) => (
            <span key={i} className={`dot ${i === current ? "active" : ""}`} />
            ))}
        </div>
        </>
    );
    }

    export default Hero;
import { useState, useRef, MouseEvent, useEffect } from 'react';

interface ProductImageZoomProps {
    image: string;
    alt: string;
}

export function ProductImageZoom({ image, alt }: ProductImageZoomProps) {
    const [showZoom, setShowZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    // The original code had cursorRef, but the provided diff removes it.
    // const cursorRef = useRef<HTMLDivElement>(null);

    // Reset state when image source changes
    // Using useEffect for this to avoid issues with direct state updates in render phase
    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        // The image element's src might not immediately reflect the prop change,
        // but setting loading state here ensures it's reset for the new image.
    }, [image]);


    const handleMouseEnter = () => !isLoading && !hasError && setShowZoom(true);
    const handleMouseLeave = () => setShowZoom(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current || isLoading || hasError) return;

        const { left, top, width, height } = imgRef.current.getBoundingClientRect();

        // Calculate cursor position relative to the image
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;

        // Constrain x and y (0 to width/height)
        // We want the zoom lens to stay within bounds. 
        // Assuming simple hover-over-image zoom for now (internal or side)
        // Let's implement a side-by-side zoom or internal lens?
        // Amazon style is usually a side pop-out usually on desktop. 
        // Let's try to do a localized 2x zoom that follows cursor? Or a side panel?
        // Side panel might break layout if not careful.
        // Let's stick to an "internal magnifier" if easy, or "side pop out".

        // Let's implement coordinates for background position.

        // Normalized coordinates (0 to 1)
        let normX = x / width;
        let normY = y / height;

        // Clamp
        normX = Math.max(0, Math.min(1, normX));
        normY = Math.max(0, Math.min(1, normY));

        setPosition({ x: normX * 100, y: normY * 100 });
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden cursor-crosshair group bg-gray-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                </div>
            )}

            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 flex-col">
                    <span className="text-4xl mb-2">📷</span>
                    <span className="text-sm">Image Failed</span>
                </div>
            ) : (
                <img
                    ref={imgRef}
                    src={image}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            )}

            {showZoom && (
                <div
                    className="absolute z-50 w-[400px] h-[400px] bg-white shadow-2xl border border-gray-200 overflow-hidden pointer-events-none rounded-lg"
                    style={{
                        // Position it to the right of the image
                        left: '100%',
                        marginLeft: '20px',
                        top: '0',
                        backgroundImage: `url("${image}")`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundSize: '250%', // Zoom level
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            )}
        </div>
    );
}

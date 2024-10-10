import React from "react";


function index(props) {
    const { src, alt, hostReact, ...otherProps } = props
    const { Spinner } = props.controls

    const [imageSrc, _setImageSrc] = hostReact.useState(src);
    const [isLoaded, setIsLoaded] = hostReact.useState(false);

    hostReact.useEffect(() => {
        const img = new Image();
        img.onload = () => {
            _setImageSrc(src);
            setIsLoaded(true)
        };
        img.src = src;
    }, [src]);



    return (<>
        <img style={{ display: isLoaded ? "" : "none" }}  {...otherProps} alt={alt} src={imageSrc} />
        <div {...otherProps} className="w-full h-full items-center justify-center flex" style={{ display: isLoaded ? 'none' : '' }}><Spinner className="h-12 w-12 m-auto" /></div></>
    )

}

export default index
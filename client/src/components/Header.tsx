import logoImg from '../assets/logo.png';

// ------------------------------------------------

function Header() {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a
                        href="https://github.com/dhavalCode/ai-image-generator"
                        className="flex items-center"
                    >
                        <img
                            src={logoImg}
                            className="mr-3 h-10 sm:h-12"
                            alt="Flowbite Logo"
                        />
                       {/*  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Image Generator
                        </span> */}
                    </a>
                    <div className="flex items-center lg:order-2 gap-x-3">
                        <a href="https://github.com/dhavalCode/ai-image-generator">
                            <img
                                alt="GitHub Repo stars"
                                src="https://img.shields.io/github/stars/dhavalcode/ai-image-generator?logoColor=ssd&style=social"
                            />
                        </a>
                        <a href="https://github.com/dhavalCode/ai-image-generator">
                            <img
                                alt="GitHub forks"
                                src="https://img.shields.io/github/forks/dhavalcode/ai-image-generator?style=social"
                            />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

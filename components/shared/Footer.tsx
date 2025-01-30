import Image from "next/image"
import Link from "next/link"


const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col sm:flex-row gap-4 p-5 text-center">
                <Link href='/'>
                    <Image
                        src='/assets/images/logo.svg'
                        alt="Logo"
                        width={144}
                        height={38}
                    />
                </Link>
                <p>Designed & Curated by {`</CJD>`}</p>
                <p>{new Date().getFullYear()} Evently. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
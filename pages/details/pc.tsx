import Layout from "../../components/Layout"
import Container from "../../components/Container"
import Link from "next/link"
import { Icon } from "@iconify/react"
import Image from "next/image"

function PC() {
    return (
        <Layout>
            <Container>
            <div className="max-w-screen-xl px-6 mx-auto mt-10">
            <embed type="application/pdf" src="/static/documents/portello.pdf" className="mx-auto w-full md:w-[700px] h-screen" />
          </div>
            </Container>
        </Layout>        
    )
}

export default PC
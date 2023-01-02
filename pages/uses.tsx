import Layout from "../components/Layout";
import Container from "../components/Container";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Bounce from "../components/Bounce";

function Uses() {
  return (
    <Layout title="What I use">
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-10">
          <Link href="javascript:window.history.back();" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="mb-5 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Uses</span>
            </b>
          </h2>
          <div className="relative bg-center bg-cover h-[300px] md:h-[600px]">
          <Image
            alt="PC Setup"
            src="/static/images/uses/pc_setup.jpg"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            className="rounded-lg"
          />
        </div>
          <h3 className="mt-3 mb-1 text-xl leading-snug md:mt-6 shine">
            <b className="font-semibold">Hardware</b>
          </h3>
          <ul>
            <li>
              <b className="font-semibold">Computer:</b> <Bounce text="Custom Built PC (Windows 11 & Arcolinux)" href="/static/documents/portello.pdf" />
            </li>
            <li>
              <b className="font-semibold">Monitor(s):</b> <Bounce text="MSI Optix G27C4 27&#34;" href="https://www.msi.com/Monitor/Optix-G27C4" />,  <Bounce href="https://www.lg.com/us/monitors/lg-24MK430H-B-led-monitor" text="LG MK430H-B 24&#34;" />
            </li>
            <li>
              <b className="font-semibold">Mouse:</b> <Bounce text="Razer Viper Mini" href="https://www.amazon.ca/gp/product/B084RPZD6T/" />
            </li>
            <li>
              <b className="font-semibold">Keyboard:</b> <Bounce text="Night Typist (CherryMX Brown)" href="https://mechanicalkeyboards.com/shop/index.php?l=product_detail&p=4295" />
            </li>
            <li>
              <b className="font-semibold">Headphones:</b> <Bounce text="HyperX Cloud Alpha" href="https://www.amazon.com/dp/B074NBSF9N" />
            </li>
          </ul>
          <h3 className="mt-3 mb-1 text-xl leading-snug shine">
            <b className="font-semibold">Development Tools</b>
          </h3>
          <ul>
          <li>
            <b className="font-semibold">Editors:</b> <Bounce text="Visual Studio Code" href="https://code.visualstudio.com/" />, <Bounce text="vim" href="https://www.vim.org/" />
          </li>
          <li>
            <b className="font-semibold">Terminal:</b> <Bounce text="Windows Terminal" href="https://www.microsoft.com/en-ca/p/windows-terminal/9n0dx20hk701" />, <Bounce text="Alacritty" href="https://github.com/alacritty/alacritty" />
          </li>
          <li>
            <b className="font-semibold">Shell:</b> <Bounce text="pwsh" href="https://github.com/PowerShell/PowerShell" />, <Bounce text="bash" href="https://www.gnu.org/software/bash/" />
          </li>
          <li>
            <b className="font-semibold">Code Management:</b> <Bounce text="GitHub" href="https://github.com/" />, <Bounce text="sourcehut" href="https://sr.ht/" />
          </li>
          </ul>
          <h3 className="mt-3 mb-1 text-xl leading-snug shine">
            <b className="font-semibold">Other Tools</b>
          </h3>
          <ul>
          <li>
            <b className="font-semibold">Design:</b> <Bounce text="Figma" href="https://www.figma.com/" />, <Bounce text="paint.NET" href="https://www.getpaint.net/" />
          </li>
          <li>
            <b className="font-semibold">Productivity:</b> <Bounce text="Notion" href="https://www.notion.so/" />, <Bounce text="Workspace" href="https://workspace.google.com/" />, <Bounce text="GitHub Projects" href="https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards" />, <Bounce text="Tasks" href="https://apps.apple.com/us/app/id/1353634006" />, <Bounce text="Calendars 5" href="https://apps.apple.com/ca/app/id/697927927" />
          </li>
          </ul>
        </div>
      </Container>
    </Layout>
  );
}

export default Uses;
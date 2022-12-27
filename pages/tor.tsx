import Layout from "../components/Layout";
import Container from "../components/Container";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

function PC() {
  return (
    <Layout>
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
              <span>Tor Websites</span>
            </b>
          </h2>
          <div className="p-2 my-5 text-center rounded-lg shadow-md text-zinc-800 bg-yellow-300/80">
            <p className="font-normal drop-shadow-lg">
              <span className="mr-2 font-semibold">Notice:</span>I am not
              responsible for any content found on these sites. I am sharing
              these for educational and archival purposes only.
            </p>
          </div>
          <ul>
            <li className="mb-5">
              <p>
                zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion
              </p>
              <p className="text-xs text-gray-500">HiddenWiki</p>
            </li>
            <li className="mb-5">
              <p>
                fhostingineiwjg6cppciac2bemu42nwsupvvisihnczinok362qfrqd.onion
              </p>
              <p className="text-xs text-gray-500">Hosting Provider</p>
            </li>
            <li className="mb-5">
              <p>
                oniondxjxs2mzjkbz7ldlflenh6huksestjsisc3usxht3wqgk6a62yd.onion
              </p>
              <p className="text-xs text-gray-500">Onion Index</p>
            </li>
            <li className="mb-5">
              <p>
                tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion
              </p>
              <p className="text-xs text-gray-500">Tor Dex</p>
            </li>
            <li className="mb-5">
              <p>
                ransomwr3tsydeii4q43vazm7wofla5ujdajquitomtd47cxjtfgwyyd.onion
              </p>
              <p className="text-xs text-gray-500">Ransomware Group Index</p>
            </li>
            <li className="mb-5">
              <p>
                blackhost7pws76u6vohksdahnm6adf7riukgcmahrwt43wv2drvyxid.onion
              </p>
              <p className="text-xs text-gray-500">
                BlackHost Services
              </p>
            </li>
            <li className="mb-5">
              <p>
                mail2torjgmxgexntbrmhvgluavhj7ouul5yar6ylbvjkxwqf6ixkwyd.onion
              </p>
                <p className="text-xs text-gray-500">Mail2Tor WebMail</p>
            </li>
            <li className="mb-5">
                <p>
                cct5wy6mzgmft24xzw6zeaf55aaqmo6324gjlsghdhbiw5gdaaf4pkad.onion
                </p>
                <p className="text-xs text-gray-500">Snopyta Services</p>
            </li>
          </ul>
        </div>
      </Container>
    </Layout>
  );
}

export default PC;

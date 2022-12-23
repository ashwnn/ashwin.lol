import { Icon } from "@iconify/react"

function Contact() {
    return (
        <div className="inline-block align-top mt-4 md:mx-10 md:px-0">
            <h2 className="text-xl font-semibold mb-1.5">
        Need to get in touch? Find me on
      </h2>
      <div className="flex gap-x-4 items-center">
      <a href="">
        <Icon className="inline-block" width={32} icon="logos:github-icon"  />
      </a>
      <a href="">
        <Icon className="inline-block" width={32} icon="material-symbols:alternate-email-rounded" />
      </a>
      <a href="">
        <Icon className="inline-block" width={28} icon="logos:stackoverflow-icon" />
      </a>
      <a href="">
        <Icon className="inline-block" width={32} icon="logos:twitter" />
      </a>
      <a href="">
        <Icon className="inline-block" width={32} icon="logos:linkedin-icon" />
      </a>
      <a href="">
        <Icon className="inline-block" width={32} icon="zondicons:key" />
      </a>
      <a href="">
        <Icon className="inline-block" width={34} icon="logos:youtube-icon" />
      </a>
      </div>
      </div>
    )
}

export default Contact
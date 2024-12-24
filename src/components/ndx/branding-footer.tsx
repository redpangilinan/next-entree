export default function BrandingFooter() {
  return (
    <div className="flex  min-h-fit w-full flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Powered by
        </h3>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-[#00AAFF] ">
          Nerf Designs
        </h2>
        <div className="leading-7">Nerf your competition</div>
      </div>

      <p className="text-center leading-7">
        Copyright © {new Date().getFullYear()} Nerf Designs. All Rights
        Reserved
      </p>
    </div>
  )
}

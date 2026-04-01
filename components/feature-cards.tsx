export function FeatureCards() {
  const features = [
    {
      image: "/tile-money-to-work.png",
      title: "Use tools that put your money to work for you",
      description: "Unlock insights that help you plan, spend and save.",
    },
    {
      image: "/tile-on-track-for-retirement.png",
      title: "See if you're on track for retirement",
      description: "Get a clear picture of where your savings stand.",
    },
    {
      image: "/tile-adjust-your-plan.png",
      title: "Adjust your plan to fit your changing needs",
      description: "Model different savings scenarios and outcomes.",
    },
  ]

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-[#d6d6d6] rounded-[40px] p-6 flex flex-col items-center text-center shadow-md w-[312px] h-[327px] mx-auto"
              style={{
                zIndex: 20,
              }}
            >
              
              <div className="w-full mb-6 overflow-hidden rounded-2xl flex items-center justify-center h-[120px]">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>

              
              <div className="flex flex-col gap-4">
                <h3
                  className="text-[20px] lg:text-[22px] leading-[1.2] text-[#003d6b] font-normal"
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[14px] lg:text-[15px] leading-[1.4] text-[#363636] font-normal"
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

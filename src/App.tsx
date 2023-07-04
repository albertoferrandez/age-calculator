import { FormEvent, useState } from "react"

function App() {
  const [result, setResult] = useState<{
    years: number | undefined
    months: number | undefined
    days: number | undefined
  }>({
    years: undefined,
    months: undefined,
    days: undefined,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const { day, year, month } = Object.fromEntries(formData)

    if (!day && !year && !month) {
      return
    } else {
      const currentDate = new Date() //fecha actual
      const birthDate = new Date(`${year}-${month}-${day}`) //fecha que debemos comparar

      let years = currentDate.getFullYear() - birthDate.getFullYear()
      let months = currentDate.getMonth() - birthDate.getMonth()
      let days = currentDate.getDate() - birthDate.getDate()

      if (months < 0 || (months === 0 && days < 0)) {
        years--
        months += 12
      }

      if (days < 0) {
        const lastMonthDate = new Date().getDay()

        days += lastMonthDate
      }
      
      setResult({
        years: years,
        months: months,
        days: days,
      })
    }
  }

  return (
    <main className="bg-[#f0f0f0] min-h-screen flex flex-col justify-center items-center font-poppins">
      <section className="bg-white p-8 w-96">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="day" className="text-xs" id="dayLabel">
                DAY
              </label>
              <input
                type="number"
                name="day"
                placeholder="DD"
                min={1}
                required
                aria-labelledby="dayLabel"
                className="border border-gray-400 w-16 px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="month" className="text-xs" id="monthLabel">
                MONTH
              </label>
              <input
                type="number"
                name="month"
                placeholder="MM"
                min={1}
                required
                aria-labelledby="monthLabel"
                className="border border-gray-400 w-16 px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="year" className="text-xs" id="yearLabel">
                YEAR
              </label>
              <input
                type="number"
                name="year"
                placeholder="YYYY"
                required
                aria-labelledby="yearLabel"
                className="border border-gray-400 w-16 px-3 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="relative">
            <hr className="my-8 w-full border-b-gray-400" />
            <button
              aria-label="submit"
              className="flex justify-center items-center absolute -top-5 right-0 h-12 w-12 rounded-full bg-purple-500"
            >
              <img src="/icon-arrow.svg" alt="" className="w-8 h-8" />
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-purple-500">
              {result.years ? result.years : "--"}
            </span>
            <span className="text-5xl font-bold">years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-purple-500">
              {result.months !== undefined
                ? result.months
                : result.months === 0
                ? 0
                : "--"}
            </span>
            <span className="text-5xl font-bold">months</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-purple-500">
            {result.days !== undefined
                ? result.days
                : result.days === 0
                ? 0
                : "--"}
            </span>
            <span className="text-5xl font-bold">days</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

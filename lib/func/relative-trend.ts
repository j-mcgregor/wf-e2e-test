


const relativeTrend = (data) => {
  const totalValue = data.reduce((prevValue, value) => {
    return prevValue + value
  }, 0)
  console.log(totalValue)

  const averageValue = parseFloat(totalValue)/parseFloat(data.length)
  console.log(averageValue)
  const dataAsPercentage = data.map(value => (value/averageValue) * 100 )
  console.log(dataAsPercentage)
}

export default relativeTrend

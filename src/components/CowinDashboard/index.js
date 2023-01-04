// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    status: componentStatus.initial,
    last7DaysVaccination: {},
    vaccinationByAge: {},
    vaccinationByGender: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: componentStatus.in_progress})
    // const url = 'https://apis.ccbp.in/covid-vaccination-data'
    // const options = {
    //   method: 'GET',
    // }
    // const response = await fetch(url, options)

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const last7DaysVaccination = data.last_7_days_vaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))

      const vaccinationByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))

      const vaccinationByGender = data.vaccination_by_gender.map(each => ({
        gender: each.gender,
        count: each.count,
      }))
      //   console.log(vaccinationByGender)
      this.setState({
        status: componentStatus.success,
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      })
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  inProgressFunction = () => (
    <div
      // eslint-disable-next-line react/no-unknown-property
      testid="loader"
      className="d-flex justify-content-center align-items-center"
    >
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failureFunction = () => (
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <img
        className="w-50 text-center"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="h4 text-light">Something went wrong</h1>
    </div>
  )

  successiveFunctions = () => {
    const {
      vaccinationByGender,
      last7DaysVaccination,
      vaccinationByAge,
    } = this.state

    return (
      <div>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  switchCase = () => {
    const {status} = this.state

    switch (status) {
      case componentStatus.in_progress:
        return this.inProgressFunction()
      case componentStatus.success:
        return this.successiveFunctions()
      case componentStatus.failure:
        return this.failureFunction()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg_container pt-5 pb-5">
        <div className="main_Container">
          <div className="w-100 d-flex align-items-center ">
            <img
              className="col-1"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="h5 text-success m-0">Co-WIN</h1>
          </div>
          <h1 className=" text-secondary mt-3">CoWIN Vaccination in India</h1>
          {this.switchCase()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { createCompany } from '../api/Companies.api'
import Navbar from '../components/Home/Navbar'

const CompanyRegisteration = () => {
  const navigate = useNavigate()
  const [companyData, setCompanyData] = useState({
    name: '',
    website: '',
    industry: '',
    location: '',
    description: '',
    LinkedIn: '',
    carrersPage: '',
    type: 'Startup',
    averageSalaryBand: 'Under 2 LPA',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [companies, setCompanies] = useState([])
  const [companyId, setCompanyId] = useState('')
  
  return (
    <div>CompanyRegisteration</div>
  )
}

export default CompanyRegisteration
import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Navigation from '../navigation/navigation';
    
export class Reacttable extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,// initial record it should start from 
            tableData: [],// table  data which we get from backend are stored in this array
            orgtableData: [],
            perPage: 5,// refers to posts per page that should be displayed when pagination is being used
            currentPage: 0,//  current page number in pagination 
            search:null// search input field value
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    changeHandler = e => {
        this.setState({
          search:e.target.value
        });
    }
   
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    componentDidMount(){
        this.getData();
    }

    getData() {
        axios
            .get(`http://localhost:3001/getContact`)
            .then(res => {

                var data = res.data;
				
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice
                })
            });
    }
    searchRecord =async (e)=>{
        try{
          e.preventDefault()
          if(this.state.search !== null){
           await axios.get(`http://localhost:3001/getContactByEmail?email=${this.state.search}`).then(
              res =>{
                if(res.data.length){
                    var data = res.data;
				
                    var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    
                    this.setState({
                        pageCount: Math.ceil(data.length / this.state.perPage),
                        orgtableData :res.data,
                        tableData:slice
                    })
                      console.log(res)
                }else{
                    alert('Not Able To Find Any Data On the Given Email')
                    return
                }
              
              }
          ).catch(error =>{
              alert('unable to fetch the records')
          });
          }
          else{
            alert('please enter the email')
          }
         
        }catch(err){
          console.log(err)
        }
      }

    render() {
        return (
            <div>
                <Navigation />
                <br />
                <div className='container'>
                  <form className="form-inline my-2 my-lg-0" onSubmit={this.searchRecord}>
                    <input className="form-control ml-sm-2" value={this.state.search} type="Enter Your Email" placeholder="Search"
                    onChange={this.changeHandler}
                    aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                 </form>
                 <br />
            
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Eamil</th>
                            <th scope="col">Message</th>
                            <th scope="col">Additional Details</th>
                        
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.tableData.map((tdata, i) => (
                                        <tr key={tdata._id}>
                                            <td>{tdata.firstname}</td>
                                            <td>{tdata.lastname}</td>
                                            <td>{tdata.email}</td>
                                            <td>{tdata.message}</td>
                                            <td>{tdata.adeatils}</td>
                                        </tr>
                                    
                                ))
                                }
                        
                            </tbody>
                        </table>

                 

                 <ReactPaginate
                    previousLabel={<button className='btn btn-primary' >Previous</button>}
                    nextLabel={<button className='btn btn-primary' >Next</button>}
                    breakLabel={""}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            </div>
        )
    }
}

export default Reacttable

import React,{Component} from "react";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faLaptopHouse} from '@fortawesome/free-solid-svg-icons';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import petFoodService from '../Services/petFoodService';
import updatePetFood from  '../Services/petFoodService';
import { CenterFocusStrong } from "@material-ui/icons";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";






const style = {
  papersty: {
    minWidth: 275,
    backgroundColor:'#212121',
    marginTop: 20,
  },
  cardsty: {
    minWidth: 270,
    backgroundColor:'#fafafa',
    margin: 20
  }
}

export default class UpdatePetFoodItem extends Component {
   constructor(props){
     super(props);
     this.state = {
        title: '',
        price:'',
        description:'',
        avatarUrl:'',
        imageUrl:'',
        animalType:'',
        id:'',
        message: null,
        snackbaropen: false,


        message:'null',
        snackbaropen: false
     }
    // this.updatePetFood = this.updatePetFood.bind(this);

    // this.loadFood = this.loadFood.bind(this);
    // this.savePetFood = this.savePetFood.bind(this);
   }

   snackbaropen = (event) =>{
    this.setState({snackbaropen: false});
  }

  




   updatePetFood = (event) => {
    event.preventDefault();
    console.log("Hiiiiiiiiiiiiiii")
    window.location.reload()
    const id = this.props.match.params.id;
    let food = {title: this.state.title, price: this.state.price, description: this.state.description, avatarUrl: this.state.avatarUrl, imageUrl: this.state.imageUrl, animalType: this.state.animalType};
    petFoodService.updatePetFoods(id, food)
        .then(res => {
          console.log(res)
            // this.setState({message : 'Food update successfully.'});
            // this.props.history.push('/food');
            this.setState({snackbaropen:true, message:'Food Details Updated successfully'})
            setTimeout(()=> this.productList(), 3000)


        }).catch(err => {
          console.log(err)
          this.setState({snackbaropen:true, message:'failed'})
        });
}


// onChange = (event) =>
//     this.setState({ [e.target.name]: e.target.value });






    onChangetitle = (event) => {
      this.setState({
        title: event.target.value
      });
    }


    onChangeprice = (event) => {
      this.setState({
        price: event.target.value
      });
      console.log(this.state.price);
    }


    onChangedescription = (event) => {
      this.setState({
        description: event.target.value
      });
    }

    onChangeavatarUrlame = (event) => {
      this.setState({
        avatarUrlame: event.target.value
      });
    }

    onChangeimageUrl = (event) => {
      this.setState({
        imageUrl: event.target.value
      });
    }


    onChangeanimalType = (event) => {
      this.setState({
      animalType: event.target.value
      });
    }

  
    componentDidMount() {
      const id = this.props.match.params.id;
      if(id) {
        this.loadFood(id);
      }
      // console.log(this.match.props.id)
    }


    loadFood =(id) =>{
      petFoodService.fetchPetFoodById(id) 
      .then((res) => {
        // console.log(res)
        let FoodBody = res.data;
        this.setState({
          id:FoodBody.id,
          title:FoodBody.title,
          price:FoodBody.price,
          description:FoodBody.description,
          avatarUrl:FoodBody.avatarUrl,
          imageUrl:FoodBody.imageUrl,
          animalType :FoodBody.animalType
        })
               

      });

    }

    handleClose =(event, reason) =>{
      if (reason === "clickaway"){
        return;
      }
  
      this.setState({snackbaropen:false})
    }

  handleSubmit = () => {
    // alert('Pet details are submitted' );
    // event.preventDefault();
    // event.preventDefault();
    let FoodBody ={
       // id: this.state.id,
        title:this.state.title,
        price:this.state.price,
        description:this.state.description,
        avatarUrl:this.state.avatarUrl,
        imageUrl:this.state.imageUrl,
        animalType :this.state.animalType
    };

    petFoodService.updatePetFood(this.props.match.params.id,FoodBody)
    .then(res => {
        // this.setState({message:'Food update successfully.'});

        
        this.setState({
          snackbaropen:true,
          massage:"Food updated successfully"
        });
       
      




        this.savePetFood = this.savePetFood.bind(this);
        // this.props.history.push('/FoodDetails')
    });
  }

  productList =() =>{
    return this.props.history.push('/edit/')
  }



//   loadUser() {
//     ApiService.fetchUserById(window.localStorage.getItem("userId"))
//         .then((res) => {
//             let user = res.data;
//             this.setState({
//                 id: user.id,
//                 username: user.username,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 age: user.age,
//                 salary: user.salary,
//             })
//         });
// }



  render(){
    const {title, price, description, avatarUrl, imageUrl, animalType} = this.state
    return(
      <>

        <div>
          <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.handleClose} >
            <Alert onClose={this.handleClose} severity="success">
              {this.state.message}
            </Alert>
          </Snackbar>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <form onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item xs={2}/>
              <Grid item xs={8}>
                <CardContent style={style.cardsty}>
                  <CardActions>
                    <CardContent>
                      <FontAwesomeIcon icon={faEdit}/>Update Pet food ilems
                      <br/>
                      <br/>
                      <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="Title"
                            name="title"
                            label="Food Title"
                            value={title}
                            onChange={this.onChangetitle}
                            helperText="Enter food's Title"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="price"
                            name="price"
                            label="Food price"
                            value={price}
                            onChange={this.onChangeprice}
                            helperText="Enter food's price"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="description"
                            name="description"
                            label="Food description"
                            value={description}
                            onChange={this.onChangedescription}
                            helperText="about food item"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="avatarUrl"
                            name="avatarUrl"
                            label="Food avatarUrl"
                            value={avatarUrl}
                            onChange={this.onChangeavatarUrlame}
                            helperText="Enter food's avatarUrl"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="animalType"
                            name="animalType"
                            label="Food animalType"
                            value={animalType}
                            onChange={this.onChangeanimalType}
                            helperText="Enter food's avatarUrl"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="imageUrl"
                            name="imageUrl"
                            label="Food imageUrl"
                            value={imageUrl}
                            onChange={this.onChangeimageUrl}
                            helperText="Enter food's imageUrl"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      </Grid>
                    </CardContent>

                  </CardActions>
                  <CardActions>
                      <Box>
                        <Box ml={2}>
                        <FormControl>
                          <Button href="" variant="contained" 
                          onClick={this.updatePetFood}
                          value="submit"
                          type="submit"
                          color="primary"
                          // onClick={this.updateFood}
                          startIcon={<SaveIcon />}>
                            <span>Update</span>
                          </Button>
                        </FormControl>
                        </Box>
                      </Box>
                      <Box>
                        <Box ml={2}>
                        <FormControl>
                          <Button onClick={this.handleSubmit} variant="contained" color="primary"
                          startIcon={<RotateLeftOutlinedIcon />}>
                            <span>Reset</span>
                          </Button>
                        </FormControl>
                        </Box>
                      </Box>

                    </CardActions>
                </CardContent>
              </Grid>
              <Grid item xs={2}/>
            </Grid>
            </form>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </>
    )
  }
}

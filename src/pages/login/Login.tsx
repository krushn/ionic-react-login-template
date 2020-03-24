import React from 'react';
import './Login.css';
import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
//services
import { AuthService } from '../../services/auth-service';
import { config } from '../../config';


class Login extends React.Component<any, any> {

  public authService: AuthService;

  constructor(props: any) {
    super(props);

    this.state = {
      userName: null,
      password: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.authService = new AuthService();
  }

  setUserName(value: any) {
    this.setState({ 'userName': value });
  }

  setPassword(value: any) {
    this.setState({ 'password': value });
  }

  handleSubmit() {

    let params = this.state;

    this.authService.signIn(params).then((response: any) => {

      response.json().then((data: any) => { 

        if (data.operation === 'success') {

          this.authService.setToken(data);

          this.props.history.push('/tab1');
        } else {
          //TODO
        }
      });
    });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <div className="login-wrapper">
            
            <div className="brand">
               Login
            </div>

            <IonItem>
              <IonInput placeholder="Enter Username" onIonChange={e => this.setUserName(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonInput placeholder="Enter Password" type="password" onIonChange={e => this.setPassword(e.detail.value!)}></IonInput>
            </IonItem>

            <IonButton expand="full" onClick={this.handleSubmit} disabled={!this.state.userName || !this.state.password}>
              Submit
            </IonButton>

          </div>

        </IonContent>
      </IonPage>
    );
  }
}

export default Login;

import { Component, OnInit } from '@angular/core'
import { SocketService } from '../socket.service'
import { FormsModule } from '@angular/forms'
import { GroupsService } from '../groups.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  images = [
    'https://i.dlpng.com/static/png/6860651_preview.png',
    'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    'https://e7.pngegg.com/pngimages/980/886/png-clipart-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head.png',
    'https://gpihefp.com/wp-content/uploads/2021/05/male_boy_person_people_avatar_icon_159358.png',
    'https://www.pngitem.com/pimgs/m/248-2483089_ubud-monkey-forest-flat-design-flat-icon-person.png',
    'https://cdn.iconscout.com/icon/premium/png-256-thumb/black-man-2888342-2399431.png'
  ]
  private socket
  messagecontent: string = ''
  messages: any[] = []
  rooms = []
  roomlist: string = ''
  roomnotice: string = ''
  currentroom: string = ''
  isinRoom = false
  newroom: string = ''
  numusers: number = 0
  username = ''
  groupList = []
  group: string = ''
  channelsList = []
  randomImage = this.images[Math.floor(Math.random() * this.images.length)];
  SERVER_URL = "http://localhost:3000/api/uploadImage";
  SEND_URL = "http://localhost:3000/api/sendImage";

  constructor(
    private socketservice: SocketService,
    private gData: GroupsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.gData.showGroup().subscribe((data: any) => {
      // console.log(data)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].members.length; j++) {
          if (this.username == data[i].members[j]) {
            this.groupList.push(data[i].group_name)
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (this.group == data[i].group_name) {
          for (let j = 0; j < data[i].group_name[j].length; j++) {}
        }
      }
    })
    this.socketservice.initSocket()
    this.socketservice.getMessage(m => {
      this.messages.push(m)
    })
    this.socketservice.reqroomList()
    this.socketservice.getroomList(msg => {
      this.rooms = JSON.parse(msg)
    })
    this.socketservice.notice(msg => {
      this.roomnotice = msg
    })
    this.socketservice.joined(msg => {
      this.currentroom = msg
      if (this.currentroom != '') {
        this.isinRoom = true
      } else {
        this.isinRoom = false
      }
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onSubmit(file)
    }
  }

  onFileSendingSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onSendSubmit(file)
    }
  }

  onSendSubmit(file: any) {
    const formData = new FormData();
    // const fileName = this.username + "_" + Date.now() + '.png';
    formData.append('image', file, `${this.username}.png`);

    this.http.post<any>(this.SEND_URL, formData).subscribe(
      (res) => {
        alert("Profile Pic Updated Successfully")
        console.log(res)
      },
      (err) => {
        alert("Error in uploading")
        console.log(err)
      }
    );
  }

  onSubmit(file: any) {
    const formData = new FormData();

    formData.append('image', file, `${this.username}.png`);

    this.http.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        alert("Profile Pic Updated Successfully")
        console.log(res)
      },
      (err) => {
        alert("Error in uploading")
        console.log(err)
      }
    );
  }

  joinroom() {
    this.socketservice.joinroom(this.roomlist)
    this.socketservice.reqnumusers(this.roomlist)
    this.socketservice.getnumusers(res => {
      this.numusers = res
    })
  }
  clearnotice() {
    this.roomnotice = ''
  }

  leaveroom() {
    this.socketservice.leaveroom(this.currentroom)
    this.socketservice.reqnumusers(this.currentroom)
    this.socketservice.getnumusers(res => {
      this.numusers = res
    })
    this.roomlist = null
    this.currentroom = ''
    this.isinRoom = false
    this.numusers = 0
    this.roomnotice = ''
    this.messages = []
  }
  channellist() {
    this.channelsList = []
    this.http.get<any>('http://localhost:3000/api/showChannel').subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (this.group == data[i].group_name) {
          for (let j = 0; j < data[i].channel.length; j++) {
            this.channelsList.push(data[i].channel[j].channel_name)
          }
        }
      }
    })
  }

  createroom() {
    //console.log(this.createroom);
    this.socketservice.createroom(this.newroom)
    this.socketservice.reqroomList()
    this.newroom = ''
  }

  chat() {
    if (this.messagecontent) {
      console.log(this.username);
      const sendingItem = {
        message: this.messagecontent,
        username: this.username,
        image: this.randomImage
      }
      this.socketservice.sendMessage(sendingItem)
      this.messagecontent = null
    } else {
      console.log('No Message')
    }
  }
}

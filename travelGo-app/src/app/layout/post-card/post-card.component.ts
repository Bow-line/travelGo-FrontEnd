import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface PostCard {
  id: number;
  title: string;
  content: string;
  userId: number;
  status: null;
  likes: number;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  postCards: PostCard[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}



  ngOnInit(): void {

    const accessToken = localStorage.getItem('Authorization') ?? '';
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });
    const options = {
      headers,
      withCredentials: true, // Enable credentials
    };

    console.log(headers);

    this.http
      .get<PostCard[]>('http://localhost:8080/api/posts/', options)
      .subscribe(
        (data) => {
          this.postCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}

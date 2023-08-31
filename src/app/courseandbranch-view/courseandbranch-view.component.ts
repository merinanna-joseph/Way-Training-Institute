import { Component, OnInit } from '@angular/core';
import { CourseNameService } from '../services/coursename.service';
import { CourseService } from '../services/course.service';
import { BranchService } from '../services/branch.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courseandbranch-view',
  templateUrl: './courseandbranch-view.component.html',
  styleUrls: ['./courseandbranch-view.component.css'],
})
export class CourseandbranchViewComponent implements OnInit {
  courseCount;
  branchCount;
  branchList;
  selectedRowIndex: any;
  rowClicked;
  rowofbranchClicked;
  courseId;
  allCoursenames;
  branchListCount;
  courseID;

  constructor(
    private coursenameService: CourseNameService,
    private courseService: CourseService,
    public branchService: BranchService,
    public toast: ToastComponent,
    public route: Router,
    private aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCoursenames();
    this.rowClicked = localStorage.getItem('courseIndexValue');
    this.courseId = localStorage.getItem('courseIdValue');
    this.rowofbranchClicked = localStorage.getItem('courseIndexValue');
    this.onCourseSelection(this.courseId);
  }
  getAllCoursenames() {
    this.coursenameService.getCourses().subscribe((data) => {
      this.allCoursenames = data;
      console.log('all coursenames', this.allCoursenames);
    });
  }
  getAllBranchnames() {
    this.branchService.getBranches().subscribe((data) => {
      this.branchList = data;
      console.log('all branchnames', this.branchList);
    });
  }
  deleteCourse(x) {
    this.branchService.getCountofBranchsbyCourseID(x).subscribe((data) => {
      this.branchListCount = data;
    });
    this.courseService
      .getCountOfCourseswithCourseId(x)
      .subscribe((datacount) => {
        this.courseCount = datacount;
        if (this.branchListCount == 0) {
          if (this.courseCount == 0) {
            this.coursenameService.deletebyCoursenameID(x).subscribe((data) => {
              this.toast.setMessage(
                'Coursename deleted successfully !!!',
                'success'
              );
              localStorage.removeItem('courseIndexValue');
              this.reload();
            });
          }

          if (this.courseCount != 0) {
            this.toast.setMessage(
              ' Cannot delete since  course is already created !!!',
              'danger'
            );
            this.rowClicked = localStorage.getItem('courseIndexValue');
          }
        }
        if (this.branchListCount > 0) {
          this.toast.setMessage(
            ' Cannot delete since  course branch existed !!!',
            'danger'
          );
          this.rowClicked = localStorage.getItem('courseIndexValue');
        }
      });

    this.reload();
  }

  deleteBranch(x) {
    this.courseService
      .getCountOfCourseswithBranchId(x)
      .subscribe((datacount) => {
        this.branchCount = datacount;
        if (this.branchCount == 0) {
          this.branchService.deleteBranchByID(x).subscribe((data) => {
            this.toast.setMessage(
              'Branchname deleted successfully !!!',
              'success'
            );
            localStorage.removeItem('branchIndexValue');
          });
        } else {
          this.toast.setMessage(
            ' Cannot delete since  course is already created !!!',
            'danger'
          );
          this.rowofbranchClicked = localStorage.getItem('courseIndexValue');
        }
        this.reload();
      });
  }
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aroute });
  }

  onCourseSelection(event) {
    this.branchList = [];
    this.courseID = event;
    localStorage.setItem('courseIdValue', this.courseID);
    this.coursenameService.getCourseById(this.courseID).subscribe((data) => {});
    this.branchService.getBranchByCourseId(this.courseID).subscribe((data) => {
      this.branchList = data;
    });
  }
  changeTableRowColor(idx: any) {
    localStorage.setItem('courseIndexValue', idx);
    if (this.rowClicked !== idx) {
      this.rowClicked = idx;
    }
  }
  changebranchTableRowColor(idx: any) {
    localStorage.setItem('branchIndexValue', idx);
    if (this.rowofbranchClicked !== idx) {
      this.rowofbranchClicked = idx;
    }
  }
}

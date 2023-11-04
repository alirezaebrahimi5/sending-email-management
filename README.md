<br/>
<p align="center">
  <h3 align="center">Responsive Micro-SaaS to manage sending email</h3>
+
  <p align="center">
    Manage email addresses in csv file to save on database and send dynamic template with multi threading and celery for each user.
    <br/>
    <br/>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/alirezaebrahimi5/sending-email-management/total) ![Contributors](https://img.shields.io/github/contributors/alirezaebrahimi5/sending-email-management?color=dark-green) ![Forks](https://img.shields.io/github/forks/alirezaebrahimi5/sending-email-management?style=social) ![Stargazers](https://img.shields.io/github/stars/alirezaebrahimi5/sending-email-management?style=social) ![Issues](https://img.shields.io/github/issues/alirezaebrahimi5/sending-email-management) ![License](https://img.shields.io/github/license/alirezaebrahimi5/sending-email-management) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/1.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/2.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/3.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/4.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/5.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/6.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/7.png)
![Screen Shot](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/preview/8.png)

This micro-saas platform can handle multi queue for each user with celery worker and multi threading. With JWT authentication and continuing email queue even after logout. Each user has specific task id for manage termination. Save email sending status for each user and delete one-by-one option. Dynamic template for each user based on csv columns.

Here's to-do:

* Change string function based on csv columns change
* Change log table columns based on user needs
* Change number of celery workers based on user account type
* Add end time with celery beat
* Draw charts based on performance and server usage
* Use web-sockets to send notifications

Challenges:

* Increase performance with parallel computing and multiprocessing with cloud cores with server selection
* Database search performance in high scale addresses and large csv batching

Ideas:

* Separating servers based on request type
* Using multiple databases for different requests and add NO-SQL for documents saving
* Cloud storage managing

## Built With

Back-end: Django
Front-end: React.js
Ui:Tailwind
multiprocessing and work handling with celery


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* Pypi

```sh
pip install -r requirements.txt
```

### Installation

1. Start redis-server

2. Clone the repo

```sh
https://github.com/alirezaebrahimi5/sending-email-management.git
```

3. Install NPM packages

```sh
npm install
```

4. Install python packages

```sh
pip install -r requirements.txt
```

5. Create database

```sh
cd backend
python manage.py makemigrations
python manage.py migrate --run-sync-db
```

6. Create superusr

```sh
python manage.py createsuperuser
```

7. Start backend on port 8000

```sh
python manage.py runserver
```

7. Start frontend on port 3000

```sh
cd frontend
npm run start
```

## Contributing



### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/alirezaebrahimi5/sending-email-management/blob/main/LICENSE.md) for more information.

## Authors

* **** - ** - []() - **

## Acknowledgements

* []()
* []()
* []()

#include "mainwindow.h"
#include <QApplication>
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <iostream>
//#include <openssl>
//#include "../../openssl/"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QNetworkAccessManager mngr;
    QNetworkRequest req(QUrl("http://mctea.tk/verify.php"));
    QNetworkReply* reply = mngr.get(req);
    QObject::connect(reply, &QNetworkReply::finished, [&]()
        {
            QByteArray read = reply->readAll();
            std::cout << "Got Response:\n"
                      << read.toStdString() << std::endl;
            reply->close();
            reply->deleteLater();
            a.quit();


    });
//    MainWindow w;
//    w.show();
    return a.exec();
}

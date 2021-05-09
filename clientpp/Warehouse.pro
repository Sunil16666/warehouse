QT       += core
QT       += gui
QT       += network

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

//LIBS += -LC:/OpenSSL-Win32/lib -lubsec

//INCLUDEPATH += C:\Users\hennl\openssl\include

TARGET = Warehouse
CONFIG += console
CONFIG -= app_bundle

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

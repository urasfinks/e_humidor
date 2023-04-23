import 'package:flutter/material.dart';
import 'package:rjdu/bottom_tab_item.dart';
import 'package:rjdu/dynamic_page.dart';
import 'package:rjdu/global_settings.dart';
import 'package:rjdu/navigator_app.dart';
import 'package:rjdu/rjdu.dart';

void main() async {
  GlobalSettings().setHost("http://192.168.0.31:8453");
  RjDu.init();

  NavigatorApp.tab.add(
    BottomTabItem({
      'name': 'main',
      'tab': {
        'flutterType': 'BottomNavigationBarItem',
        'icon': {'flutterType': 'Icon', 'src': 'crop_5_4'},
        'label': 'Home'
      },
      'content': {
        'flutterType': 'Notify',
        'link': {'template': 'HomePage.json'},
        'linkContainer': 'root',
        'linkDefault': {
          'template': {
            "flutterType": "Scaffold",
            "appBar": {
              "flutterType": "AppBar",
              "title": {"flutterType": "Text", "label": "E-Humidor"}
            }
          }
        }
      }
    }),
  );
  NavigatorApp.tab.add(
    BottomTabItem({
      'name': 'user',
      'tab': {
        'flutterType': 'BottomNavigationBarItem',
        'icon': {'flutterType': 'Icon', 'src': 'account_circle'},
        'label': 'Home'
      },
      'content': {
        'flutterType': 'Notify',
        'link': {'template': 'Account.json'},
        'linkContainer': 'root',
        'linkDefault': {
          'template': {
            "flutterType": "Scaffold",
            "appBar": {
              "flutterType": "AppBar",
              "title": {"flutterType": "Text", "label": "Аккаунт"}
            }
          }
        }
      }
    }),
  );

  runApp(DynamicPage(const {
    'flutterType': 'Notify',
    'link': {'template': 'main.json'},
    'linkContainer': 'root',
    'linkDefault': {
      'template': {'flutterType': 'MaterialApp'}
    }
  }));
}

//
//  AppState.swift
//  PaperLib
//
//  Created by GeoffreyChen on 26/11/2021.
//

import SwiftUI
import Combine
import RealmSwift

struct AppState: Equatable {
    var setting = Setting()

}

extension AppState {
    struct Setting: Equatable {
        var settingOpened = false
        var libMoveRequest = false
        var appLibFolder = UserDefaults.standard.string(forKey: "appLibFolder") ?? ""
        var colorScheme = UserDefaults.standard.string(forKey: "preferColorTheme") ?? "System Default"
        var invertColor = UserDefaults.standard.bool(forKey: "invertColor")
    }
}

func == (lhs: AppState, rhs: AppState) -> Bool {
    return lhs.setting == rhs.setting
}
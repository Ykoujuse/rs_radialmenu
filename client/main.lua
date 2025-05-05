local isMenuOpen = false

RegisterKeyMapping('radialmenu', '打开径向菜单', 'keyboard', 'F1')

RegisterCommand('radialmenu', function()
    if not isMenuOpen and not IsPauseMenuActive() then
        OpenRadialMenu()
    else
        CloseRadialMenu()
    end
end, false)

function OpenRadialMenu()
    if isMenuOpen then return end
    
    isMenuOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = 'open',
        menu = Config.Menu
    })
end

function CloseRadialMenu()
    if not isMenuOpen then return end
    
    isMenuOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'close'
    })
end

RegisterNUICallback('enableMouse', function(data, cb)
    SetNuiFocus(true, true)
    cb('ok')
end)

RegisterNUICallback('disableMouse', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('triggerEvent', function(data, cb)
    if data.event then
        TriggerEvent(data.event, data.data)
    end
    cb('ok')
end)

RegisterNUICallback('executeCommand', function(data, cb)
    if data.command then
        ExecuteCommand(data.command)
    end
    cb('ok')
end)

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and isMenuOpen then
        CloseRadialMenu()
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(300)
        if isMenuOpen and IsPauseMenuActive() then
            CloseRadialMenu()
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        if not isMenuOpen then
            SetNuiFocus(false, false)
        end
    end
end)

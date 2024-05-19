from django.http import JsonResponse
from django.shortcuts import render
import nmap
import socket
import threading
import time
from ipaddress import ip_network
import concurrent.futures
from enum import Enum



class PresentTypeEnum(Enum):
    List = 0
    Tree = 1

present_type = PresentTypeEnum.List


def switch_type(request):
    if (present_type == PresentTypeEnum.List):
        present_type = PresentTypeEnum.Tree
    else:
        present_type = PresentTypeEnum.List
    print("present type:", present_type.value)
    return render(request, 'listscan.html', {'present_type': present_type})

def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def scan_network(network_range):
    nm = nmap.PortScanner()
    scan_results = nm.scan(hosts=network_range, arguments='-sP -T4 -R')

    devices = []
    for host in nm.all_hosts():
        device_info = {
            'host': host,
            'hostname': nm[host].hostname(),
            'state': nm[host].state(),
        }
        devices.append(device_info)
    return devices


def network_scan_view(request):
    network_range = '192.168.54.0/24'
    devices = scan_network(network_range)
    return JsonResponse({'devices': devices})


# list 
def network_scan(request):
    network_range = '192.168.54.0/24'
    devices = scan_network(network_range)
    return render(request,'listscan.html',{'devices': devices})

def visualization_view(request):
    return render(request, 'treescan.html')


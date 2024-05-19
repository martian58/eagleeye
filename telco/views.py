from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Node, Connection, Alarm, Fault

def node_list(request):
    nodes = Node.objects.all()
    return render(request, 'node_list.html', {'nodes': nodes})

def node_tree(request):
    nodes = Node.objects.all()
    return JsonResponse({'nodes': nodes})


def node_detail(request, pk):
    node = get_object_or_404(Node, pk=pk)
    connections = Connection.objects.filter(source=node) | Connection.objects.filter(target=node)
    alarms = Alarm.objects.filter(node=node)
    faults = Fault.objects.filter(node=node)
    return render(request, 'node_detail.html', {
        'node': node,
        'connections': connections,
        'alarms': alarms,
        'faults': faults
    })

def alarm_list(request):
    alarms = Alarm.objects.all()
    return render(request, 'alarm_list.html', {'alarms': alarms})

def fault_list(request):
    faults = Fault.objects.all()
    return render(request, 'fault_list.html', {'faults': faults})
